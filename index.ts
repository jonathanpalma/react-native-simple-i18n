import React, {useContext, useEffect, useState} from 'react';
import {
  addEventListener,
  findBestAvailableLanguage,
  removeEventListener,
} from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

const translate = memoize(
  (key, config?) => i18n.t(key, config),
  (key, config?) => (config ? key + JSON.stringify(config) : key),
);

type Translate = typeof translate;
type ContextState = {translate: Translate};
type i18nMessages = {[key: string]: () => any};
type RenderProp = {children: (props: ContextState) => React.ReactNode};

export const setI18nConfig = (messages: i18nMessages, fallback: string) => {
  const {languageTag} = findBestAvailableLanguage(Object.keys(messages)) || {
    languageTag: fallback,
  };

  if (translate.cache.clear) {
    translate.cache.clear();
  }

  i18n.translations = {[languageTag]: messages[languageTag]()};
  i18n.locale = languageTag;

  return translate;
};

export function useI18n(messages: i18nMessages, fallback = 'en') {
  const [state, setState] = useState({} as ContextState);

  useEffect(() => {
    const t = setI18nConfig(messages, fallback);
    setState({translate: t});
  }, [messages, fallback]);
  useEffect(() => {
    function handleLocalizationChange() {
      const t = setI18nConfig(messages, fallback);
      setState({translate: t});
    }
    addEventListener('change', handleLocalizationChange);
    return () => {
      removeEventListener('change', handleLocalizationChange);
    };
  });

  return state;
}

const I18nContext = React.createContext<ContextState>({} as ContextState);
const {Provider} = I18nContext;
export {Provider as I18nProvider};

export function useI18nContext() {
  const context = useContext(I18nContext);

  // FIXME: The error is never displayed because (!context) is always false
  // considering that even when there is no context it takes the default value {}.
  // Verifying if the value is an empty object throws the error in the first
  // call, taking into account that Context API works async.
  // Another solution would be to track the previous value... PR would be welcome :)

  // const prevContextRef = useRef<ContextState>();
  // useEffect(() => {
  //   prevContextRef.current = context;
  // });
  // const prevContext = prevContextRef.current;
  // if (prevContext && !isEmpty(prevContext) && isEmpty(context)) {

  if (!context) {
    throw new Error(
      'Components using i18n must be rendered within the I18nProvider component',
    );
  }
  return context;
}

export function I18nConsumer({children}: RenderProp) {
  const context = useI18nContext();
  return children(context);
}
