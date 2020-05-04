<div align="center">
  <h1>react-native-simple-i18n 🌎</h1>

  <p>Small i18n lib for react-native based on <a href="https://github.com/react-native-community/react-native-localize">react-native-localize</a>, <a href="https://github.com/fnando/i18n-js">i18n-js</a> and <a href="https://www.npmjs.com/package/lodash.memoize">lodash.memoize</a></p>
</div>

[![Version][version-badge]][package]
[![Install Size][size-badge]][package-size]
[![Downloads][downloads-badge]][npmcharts]
[![PRs Welcome][prs-badge]][prs]
[![Commitizen friendly][cz-badge]][cz]
[![MIT License][license-badge]][license]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

This library was inspired by [How to use React Native Localize in React Native apps][blog-article] (written by [Aman Mittal][aman-twitter]) so please go and leave this guy some 👏.

Disclaimer: This library only supports translations, it does NOT support cultural settings (currency, dates, times, etc)

## Getting Started

### Peer Dependencies

- react: [16.8.0][react-16.8.0]+
- react-native: [0.59.0][react-native-0.59]+
- react-native-localize: [1.3.4][react-native-localize-1.3.4]+

### Installation

```
npm install -S react-native-simple-i18n
```

### How to use it

#### App.tsx

```diff
import React from 'react';
+ import { I18nProvider, useI18nProvider } from 'react-native-simple-i18n';
import ReduxProvider from 'src/components/ReduxProvider';
import Main from 'src/components/Main';

+ const messages = {
+   en: () => require('src/i18n/en.json'),
+   es: () => require('src/i18n/es.json'),
+   fr: () => require('src/i18n/fr.json'),
+ };

function App() {
+ const i18n = useI18nProvider(messages);
  return (
    <>
      <ReduxProvider>
+       <I18nProvider value={i18n}>
          <Main />
+       </I18nProvider>
      </ReduxProvider>
    </>
  );
}

export default App;
```

#### src/i18n/es.json

```json
{
  "active": "Activo",
  "inactive": "Inactivo",
  "unknown": "Desconocido"
}
```

#### src/components/Main.tsx

```diff
import React from 'react';
import { Text, View } from 'react-native';
+ import { useI18n } from 'react-native-simple-i18n';

function Main() {
+ const { translate } = useI18n();
  return (
    <View>
      <Text>
+        {translate('active')}
      </Text>
    </View>
  );
}

export default Main;
```

## License

MIT © [jonathanpalma](https://github.com/jonathanpalma)

[downloads-badge]: https://img.shields.io/npm/dm/react-native-simple-i18n.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/react-native-simple-i18n.svg?style=flat-square
[license]: https://github.com/jonathanpalma/react-native-simple-i18n/blob/master/LICENSE
[npmcharts]: http://npmcharts.com/compare/react-native-simple-i18n
[package-size]: https://packagephobia.now.sh/result?p=react-native-simple-i18n
[package]: https://www.npmjs.com/package/react-native-simple-i18n
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[cz-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square
[cz]: http://commitizen.github.io/cz-cli/
[size-badge]: https://flat.badgen.net/packagephobia/install/react-native-simple-i18n
[version-badge]: https://img.shields.io/npm/v/react-native-simple-i18n.svg?style=flat-square
[github-watch-badge]: https://img.shields.io/github/watchers/jonathanpalma/react-native-simple-i18n.svg?style=social
[github-watch]: https://github.com/jonathanpalma/react-native-simple-i18n/watchers
[github-star-badge]: https://img.shields.io/github/stars/jonathanpalma/react-native-simple-i18n.svg?style=social
[github-star]: https://github.com/jonathanpalma/react-native-simple-i18n/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20react-native-simple-i18n!%20https://github.com/jonathanpalma/react-native-simple-i18n
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/jonathanpalma/react-native-simple-i18n.svg?style=social
[aman-twitter]: https://twitter.com/amanhimself
[blog-article]: https://heartbeat.fritz.ai/how-to-use-react-native-localize-in-react-native-apps-3bb3d510f801
[react-16.8.0]: https://github.com/facebook/react/releases/tag/v16.8.0
[react-native-0.59]: https://github.com/facebook/react-native/releases/tag/v0.59.0
[react-native-localize-1.3.4]: https://github.com/react-native-community/react-native-localize/releases/tag/1.3.4
