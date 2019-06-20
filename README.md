# react-recaptcha-v3-v2

a React reCAPTCHA version 3 and version 2 (checkbox) component in one.

- Small and Performant, only 10.8KB
- Available for both Javascript and Typescript projects
- No need to include two reCAPTCHA script tags
- Supports v3 and v2 in the same page, at the same time
- Free to use only v3 or v2 or both (no need to have both site keys, to use one version)
- Dynamically add or remove multiple instances of any version, at any time
- Does not block the page from loading or scripts from executing
- Supports custom props to the v2 component (className, id, data-x, etc.)
- Easy to use, single callback for Token/Expiration/Error handling

## usage

### requirements

1. React 16.6.0+

### installation

1. `$npm install react-recaptcha-v3-v2 --save`

### basic typescript example

```ts
import {
  ReCaptchaProvider,
  ReCaptchaV2,
  ReCaptchaV3,
  TReCaptchaV2Callback,
  TReCaptchaV3Callback
} from "react-recaptcha-v3-v2";

const v2Callback: TReCaptchaV2Callback = (
  token: string | false | Error
): void => {
  if (typeof token === "string") {
    console.log("this is the token", token);
  } else if (typeof token === "boolean" && !token) {
    console.log("token has expired, user must check the checkbox again");
  } else if (token instanceof Error) {
    console.log("error. please check your network connection");
  }
};

const v3Callback: TReCaptchaV3Callback = (token: string | void): void => {
  if (typeof token === "string") {
    console.log("this is the token", token);
  } else {
    console.log("token retrieval in progress...");
  }
};
```

...

```tsx
<ReCaptchaProvider
  siteKeyV2="your-reCAPTCHA-v2-site-key"
  siteKeyV3="your-reCAPTCHA-v3-site-key"
>
  Your Application
  <ReCaptchaV2 callback={v2Callback} />
  <ReCaptchaV3 action="your-action" callback={v3Callback} />
</ReCaptchaProvider>
```

### basic javascript example

```js
import {
  ReCaptchaProvider,
  ReCaptchaV2,
  ReCaptchaV3
} from "react-recaptcha-v3-v2";

const v2Callback = token => {
  if (typeof token === "string") {
    console.log("this is the token", token);
  } else if (typeof token === "boolean" && !token) {
    console.log("token has expired, user must check the checkbox again");
  } else if (token instanceof Error) {
    console.log("error. please check your network connection");
  }
};

const v3Callback = token => {
  if (typeof token === "string") {
    console.log("this is the token", token);
  } else {
    console.log("token retrieval in progress...");
  }
};
```

...

```jsx
<ReCaptchaProvider
  siteKeyV2="your-reCAPTCHA-v2-site-key"
  siteKeyV3="your-reCAPTCHA-v3-site-key"
>
  Your Application
  <ReCaptchaV2 callback={v2Callback} />
  <ReCaptchaV3 action="your-action" callback={v3Callback} />
</ReCaptchaProvider>
```

### ReCaptchaProvider

This is required only once, per application and should be placed as a wrapper for the whole application if possible. That way, you can insert and remove dynamically, at any place, the ReCaptchaV2 / ReCaptchaV3 components.

It is responsible for injecting the required Javascript Script Tag, CSS Style Tag, when needed and passing down the site keys using react context.

#### Available Props

| prop        | type    | default value | description                                                                                                                                                                                      |
| ----------- | ------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| siteKeyV2   | string  | empty         | reCAPTCHA v2 site key, which you can get from https://www.google.com/recaptcha Required, if you plan to use the v2 component                                                                     |
| siteKeyV3   | string  | empty         | reCAPTCHA v3 site key, which you can get from https://www.google.com/recaptcha Required, if you plan to use the v3 component                                                                     |
| langCode    | string  | auto-detected | Lanuage Code of the Widget. If provided, the v2 checkbox component, will be rendered in that language. For a list of available values, see https://developers.google.com/recaptcha/docs/language |
| hideV3Badge | boolean | false         | If true, the v3 Badge will be hidden using css. Before using this, please make sure you have read the terms of hiding the badge here https://developers.google.com/recaptcha/docs/faq            |

## development environment

### development prerequisites

1. [nodejs](https://nodejs.org/en/) 10.15.x LTS

### development setup

1. `$cd module`
1. `$npm install`
1. `$cd ../dev`
1. `$npm install`
1. create `.env` file with your reCAPTCHA keys using `.env.example` as a template
1. `$npm start`
1. open browser to `http://locahost:9000`

## demo

### demo prerequisites

1. [nodejs](https://nodejs.org/en/) 10.15.x LTS

### demo setup

1. `$cd module`
1. `$npm install`
1. `$npm run build`
1. `$npm link` _(you might need sudo)_
1. `$cd ../demo`
1. `$npm install`
1. `$npm link react-recaptcha-v3-v2`
1. `$npm start`
1. open browser to `http://locahost:9001`
