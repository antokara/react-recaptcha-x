# react-recaptcha-x

a React component for Google's reCAPTCHA v3 and v2 (checkbox) component.

[![npm][npm]][npm-url]
[![Last Release][last-release]][last-release-url]
[![Last Commit][last-commit]][last-commit-url]
[![Coverage][coveralls]][coveralls-url]

[![Dependencies][deps]][deps-url]
[![Build Status][build-status]][build-status-url]
[![FOSSA Status][licenses]][licenses-url]

[![npm Downloads][npm-downloads]][npm-downloads-url]
[![GitHub Issues][github-issues]][github-issues-url]
[![Top Language][top-language]][top-language-url]
[![License][license]][license-url]
![Types][types]

- Small and Performant, only 10.8KB
- Available for both **Javascript** and **Typescript** projects
- Plug and play. No CSS or Script Tags required!
- It only inserts one _recaptcha/api.js_ script tag
- Supports v3 and v2 in the same page, at the same time
- Free to use only v3 or v2 or both (no need to have both site keys, to use one version)
- Dynamically add or remove multiple instances of any version, at any time
- Does not block the page from loading or scripts from executing
- Supports custom props to the v2 component (className, id, data-x, etc.)
- Easy to use, single callback for Token/Expiration/Error handling

## why I created another one of those reCAPTCHA wrappers

Using the Google reCAPTCHA v3, can be an issue if your human user,
gets a low score and is falsely identified as a bot. There is nothing the user can do to proceed, in that case.

This can be especially troublesome, if it happens during an important action, such as signing up.
Chances are, your human user will not be able to proceed and won't retry either.

Using this component, you can chose to fallback to the Google reCAPTCHA v2 checkbox, if the user scored low and was identified as a bot. This will allow the user to attempt to pass the checkbox and
perhaps, solve the more difficult image reCAPTCHA.

Most reCAPTCHA wrappers do not support both v3 and v2 at the same time properly. This component was created to solve that case, so that you would never lose a human user again.

## usage

### requirements

1. [React 16.6.0+ or 17.x](https://reactjs.org/)
1. reCAPTCHA v2 / v3 site key(s), which you can get from [here](https://www.google.com/recaptcha)

### installation

`$npm install react-recaptcha-x --save`

### simple javascript example

```js
import {
  EReCaptchaV2Size,
  EReCaptchaV2Theme,
  ReCaptchaProvider,
  ReCaptchaV2,
  ReCaptchaV3
} from 'react-recaptcha-x';

const v2Callback = (token) => {
  if (typeof token === 'string') {
    console.log('this is the token', token);
  } else if (typeof token === 'boolean' && !token) {
    console.log('token has expired, user must check the checkbox again');
  } else if (token instanceof Error) {
    console.log('error. please check your network connection');
  }
};

const v3Callback = (token, refreshToken) => {
  if (typeof token === 'string') {
    console.log('this is the token', token);
    if (typeof refreshToken === 'function') {
      console.log('this is the refresh token function', refreshToken);
    }
  } else {
    console.log('token retrieval in progress...');
  }
};
```

...

```jsx
<ReCaptchaProvider
  siteKeyV2="your-reCAPTCHA-v2-site-key"
  siteKeyV3="your-reCAPTCHA-v3-site-key"
  langCode="en"
  hideV3Badge={false}
>
  Your Application
  <ReCaptchaV2
    callback={v2Callback}
    theme={EReCaptchaV2Theme.Light}
    size={EReCaptchaV2Size.Normal}
    id="my-id"
    data-test-id="my-test-id"
    tabindex={0}
  />
  <ReCaptchaV3 action="your-action" callback={v3Callback} />
</ReCaptchaProvider>
```

### simple typescript example

```ts
import {
  EReCaptchaV2Size,
  EReCaptchaV2Theme,
  ReCaptchaProvider,
  ReCaptchaV2,
  ReCaptchaV3,
  TReCaptchaV2Callback,
  TReCaptchaV3Callback
} from 'react-recaptcha-x';

const v2Callback: TReCaptchaV2Callback = (
  token: string | false | Error
): void => {
  if (typeof token === 'string') {
    console.log('this is the token', token);
  } else if (typeof token === 'boolean' && !token) {
    console.log('token has expired, user must check the checkbox again');
  } else if (token instanceof Error) {
    console.log('error. please check your network connection');
  }
};

const v3Callback: TReCaptchaV3Callback = (
  token: string | void,
  refreshToken: TReCaptchaV3RefreshToken | void
): void => {
  if (typeof token === 'string') {
    console.log('this is the token', token);
    if (typeof refreshToken === 'function') {
      console.log('this is the refresh token function', refreshToken);
    }
  } else {
    console.log('token retrieval in progress...');
  }
};
```

...

```tsx
<ReCaptchaProvider
  siteKeyV2="your-reCAPTCHA-v2-site-key"
  siteKeyV3="your-reCAPTCHA-v3-site-key"
  langCode="en"
  hideV3Badge={false}
>
  Your Application
  <ReCaptchaV2
    callback={v2Callback}
    theme={EReCaptchaV2Theme.Light}
    size={EReCaptchaV2Size.Normal}
    id="my-id"
    data-test-id="my-test-id"
    tabindex={0}
  />
  <ReCaptchaV3 action="your-action" callback={v3Callback} />
</ReCaptchaProvider>
```

### ReCaptchaProvider _(provider)_

This is required only once, per application and should be placed as a wrapper for the whole application if possible. That way, you can insert and remove dynamically, at any place, the ReCaptchaV2 / ReCaptchaV3 components.

It is responsible for injecting the required Javascript Script Tag, CSS Style Tag when needed and passing down the site keys using [react context](https://reactjs.org/docs/context.html).

#### ReCaptchaProvider Props

| prop        | type    | default value | description                                                                                                                                                                                                        |
| ----------- | ------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| siteKeyV2   | string  | empty         | reCAPTCHA v2 site key, which you can get from [here](https://www.google.com/recaptcha). Required, if you plan to use the v2 component                                                                              |
| siteKeyV3   | string  | empty         | reCAPTCHA v3 site key, which you can get from [here](https://www.google.com/recaptcha). Required, if you plan to use the v3 component                                                                              |
| langCode    | string  | auto-detected | Optional. Lanuage Code of the Widget. If provided, the v2 checkbox component, will be rendered in that language. For a list of available values, see [here](https://developers.google.com/recaptcha/docs/language) |
| hideV3Badge | boolean | false         | Optional. If true, the v3 Badge will be hidden using css. Before using this, please make sure you have read the terms of hiding the badge [here](https://developers.google.com/recaptcha/docs/faq)                 |

### ReCaptchaV2 _(checkbox, component)_

It can be used to render the reCAPTCHA v2 checkbox Component. It must be a child of the ReCaptchaProvider (direct or indirect, at any level). It requires a siteKeyV2 to be defined in the ReCaptchaProvider.

The use of this component is not required but can be combined with the v3 reCAPTCHA Component (ie. as a failover in case of a false positive as a bot).

#### ReCaptchaV2 Props

| prop     | type                                     | default value | description                                                                                                                                                                                                                                                                                  |
| -------- | ---------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callback | function(token:string or false or Error) | n/a           | Required. When called with string (token), it means token retrieved. When called with false as an argument, it means the response expired and the user needs to re-verify. When called with Error, it means an error occurred and the widget cannot continue (usually network disconnection) |
| theme    | string                                   | light         | Optional. light or dark. The color theme of the widget                                                                                                                                                                                                                                       |
| size     | string                                   | normal        | Optional. normal or compact. The size of the widget                                                                                                                                                                                                                                          |
| tabindex | number                                   | 0             | Optional. The tabindex of the widget                                                                                                                                                                                                                                                         |

### ReCaptchaV3 _(invisible with score, component)_

It can be used to handle the reCAPTCHA v3 invisible (score) Component. It must be a child of the ReCaptchaProvider (direct or indirect, at any level). It requires a siteKeyV3 to be defined in the ReCaptchaProvider.

The use of this component is not required but can be combined with the v2 reCAPTCHA Component (ie. first try v3 and if that fails, show v2 in case of a false positive as a bot).

#### ReCaptchaV3 Props

| prop     | type                                                    | default value | description                                                                                                                                                                                                                                                  |
| -------- | ------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| callback | function(token:string or void, refreshToken:fn or void) | n/a           | Required. When called without arguments, it means requesting token in progress. When called with string (token) and function (refreshToken), it means token retrieved. The refreshToken function can be used at any time, to refresh the token by calling it |
| action   | string                                                  | n/a           | Required. The name of the action to keep score and statistic about. It can only contain alphanumeric characters and slashes, and must not be user-specific                                                                                                   |

## working examples

### examples prerequisites & setup

1. [nodejs](https://nodejs.org/en/) 10.x.x LTS
1. `$npm install`
1. `$npm run build`
1. `$npm link` _(you might need to run with sudo, if you get permission denied)_

### typescript examples setup

1. `$cd examples/typescript`
1. `$npm install`
1. `$npm link react-recaptcha-x`
1. create `.env` file with your reCAPTCHA key(s) using `.env.example` as a template
1. `$npm start`
1. open browser to `http://localhost:9001`

### javascript examples setup

1. `$cd examples/javascript`
1. `$npm install`
1. `$npm link react-recaptcha-x`
1. create `.env` file with your reCAPTCHA key(s) using `.env.example` as a template
1. `$npm start`
1. open browser to `http://localhost:9001`

## other credits

This project uses and includes, a modified version, of the Type definitions for Google Recaptcha 2.0. Original version taken from [here](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/grecaptcha/index.d.ts). Original Definitions by: Kristof Mattei <http://kristofmattei.be> Martin Costello <https://martincostello.com/> Ruslan Arkhipau <https://github.com/DethAriel> Rafael Tavares <https://github.com/rafaeltavares> Definitions: <https://github.com/DefinitelyTyped/DefinitelyTyped>

[npm]: https://img.shields.io/npm/v/react-recaptcha-x.svg
[npm-url]: https://www.npmjs.com/package/react-recaptcha-x
[deps]: https://david-dm.org/antokara/react-recaptcha-x.svg
[deps-url]: https://david-dm.org/antokara/react-recaptcha-x
[licenses]: https://app.fossa.com/api/projects/git%2Bgithub.com%2Fantokara%2Freact-recaptcha-x.svg?type=shield
[licenses-url]: https://app.fossa.com/projects/git%2Bgithub.com%2Fantokara%2Freact-recaptcha-x?ref=badge_shield
[build-status]: https://travis-ci.org/antokara/react-recaptcha-x.svg?branch=master
[build-status-url]: https://travis-ci.org/antokara/react-recaptcha-x
[license]: https://img.shields.io/npm/l/react-recaptcha-x.svg
[license-url]: https://github.com/antokara/react-recaptcha-x/blob/master/LICENSE
[top-language]: https://img.shields.io/github/languages/top/antokara/react-recaptcha-x.svg
[top-language-url]: https://github.com/antokara/react-recaptcha-x/search?l=typescript
[github-issues]: https://img.shields.io/github/issues/antokara/react-recaptcha-x.svg
[github-issues-url]: https://github.com/antokara/react-recaptcha-x/issues
[npm-downloads]: https://img.shields.io/npm/dm/react-recaptcha-x.svg
[npm-downloads-url]: https://www.npmjs.com/package/react-recaptcha-x
[types]: https://img.shields.io/npm/types/react-recaptcha-x.svg
[last-commit]: https://img.shields.io/github/last-commit/antokara/react-recaptcha-x.svg
[last-commit-url]: https://github.com/antokara/react-recaptcha-x/graphs/commit-activity
[last-release]: https://img.shields.io/github/release-date/antokara/react-recaptcha-x.svg
[last-release-url]: https://github.com/antokara/react-recaptcha-x/releases
[coveralls]: https://coveralls.io/repos/github/antokara/react-recaptcha-x/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/antokara/react-recaptcha-x?branch=master
