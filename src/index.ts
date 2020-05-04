import React, { useContext, useEffect, useState } from 'react';
import {
  addEventListener,
  findBestAvailableLanguage,
  removeEventListener,
} from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

const translate = memoize(
  (key, config?) => i18n.t(key, config),
  (key, config?) => (config ? key + JSON.stringify(config) : key)
);

type Translate = typeof translate;
type I18nState = { translate: Translate };
type I18nMessages = { [key: string]: () => any };
type RenderProp = { children: (props: I18nState) => React.ReactNode };

export const setI18nConfig = (messages: I18nMessages, fallback: string) => {
  const { languageTag } = findBestAvailableLanguage(Object.keys(messages)) || {
    languageTag: fallback,
  };

  if (translate.cache?.clear) {
    translate.cache.clear();
  }

  i18n.translations = { [languageTag]: messages[languageTag]() };
  i18n.locale = languageTag;

  return translate;
};

const defaultState: I18nState = {
  translate: memoize((_) => ''),
};
export function useI18nProvider(messages: I18nMessages, fallback = 'en') {
  const [state, setState] = useState<I18nState>(defaultState);

  useEffect(() => {
    const t = setI18nConfig(messages, fallback);
    setState({ translate: t });
  }, [messages, fallback]);
  useEffect(() => {
    function handleLocalizationChange() {
      const t = setI18nConfig(messages, fallback);
      setState({ translate: t });
    }
    addEventListener('change', handleLocalizationChange);
    return () => {
      removeEventListener('change', handleLocalizationChange);
    };
  });

  return state;
}

const I18nContext = React.createContext<I18nState>(defaultState);
const { Provider } = I18nContext;
export { Provider as I18nProvider };

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error(
      'Components using i18n must be rendered within the I18nProvider component'
    );
  }
  return context;
}

export function I18nConsumer({ children }: RenderProp) {
  const context = useI18n();
  return children(context);
}
