# react-recaptcha-v3-v2

a React reCAPTCHA version 3 and version 2 component in one.

- Small and Performant
- No need to include two reCAPTCHA script tags
- Supports v3 and v2 in the same page, at the same time
- Free to use only v3 or v2 or both (no need to have both site keys, to use one version)
- Supports multiple instances of any version, at any time
- Does not block the page from loading or scripts from executing
- Allows custom props to the v2 component (className, id, data-x, etc.)
- Easy to use, single callback for Token/Expiration/Error handling

## usage

### installation

1. `$npm install react-recaptcha-v3-v2 --save`

### use in typescript

@todo

### use in javascript

@todo

## development environment

### development prerequisites

1. [nodejs](https://nodejs.org/en/) 10.15.x LTS

### development setup

1. `$cd module`
1. `$npm install`
1. `$cd ../dev`
1. `$npm install`
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
