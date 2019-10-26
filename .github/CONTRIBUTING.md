# Contributing to react-recaptcha-x

The following is a set of guidelines for contributing to this project. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table Of Contents

[Code of Conduct](#code-of-conduct)

[How to Contribute](#How-to-Contribute)

- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)
- [Pull Requests](#pull-requests)

[Development Environment](#Development-Environment)

- [Prerequisites](#development-prerequisites)
- [Setup](#Development-Setup)

[Code Quality / Linting](#Code-Quality-/-Linting)

- [Packages / References](#Code-Quality-/-Linting---Packages-/-References)
- [Commands](#Code-Quality-/-Linting---Commands)

[Unit Testing](#Unit-Testing)

- [Packages / References](#Unit-Testing---Packages-/-References)
- [Commands](#Unit-Testing---Commands)
- [Reports](#Unit-Testing---Reports)

[Build / Deployment / Release](#Build-/-Deployment-/-Release)

- [Packages / References](#Build-/-Deployment-/-Release---Packages-/-References)
- [Commands](#Build-/-Deployment-/-Release---Commands)

## Code of Conduct

This project and everyone participating in it is governed by the following [Code of Conduct](https://github.com/antokara/react-recaptcha-x/blob/master/.github/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team at antokarag@gmail.com.

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check the existing [issues list](https://github.com/antokara/react-recaptcha-x/issues) as you might find out that you don't need to create one.

When you are creating a bug report, please include as many details as possible. Fill out the required [bug report template](https://github.com/antokara/react-recaptcha-x/blob/master/.github/ISSUE_TEMPLATE/bug_report.md), which asks for information that helps us resolve issues faster.

### Feature Requests

Before creating a feature request, please check the existing [issues list](https://github.com/antokara/react-recaptcha-x/issues) as you might find out that you don't need to create one.

When you are creating a feature request, please include as many details as possible. Fill out the required [feature request template](https://github.com/antokara/react-recaptcha-x/blob/master/.github/ISSUE_TEMPLATE/feature_request.md), which asks for information that helps us understand the request and use case for it.

### Pull Requests

Please do not open a pull request that does not reference an existing issue. Any given pull request should attempt to solve an existing issue or enhance a feature / documentation / etc.

When you are creating a pull request, please fill out the required [pull request template](https://github.com/antokara/react-recaptcha-x/blob/master/.github/PULL_REQUEST_TEMPLATE.md), which makes sure the pull requests follow certain standards and provide helpful information.

In order for a pull request to get accepted, it must pass the automated Linting / Tests / License Scan and then the manual code review process.

Pull Requests that fail the automated checks, will not get code reviewed until adjusted to pass.

## Development Environment

### Development Prerequisites

1. [nodejs](https://nodejs.org/en/) 10.x.x LTS

### Development Setup

1. `$npm install`
1. `$cd dev`
1. `$npm install`
1. create `.env` file with your reCAPTCHA key(s) using `.env.example` as a template
1. `$npm start`
1. open browser to `http://locahost:9000`

### Code Quality / Linting

#### Code Quality / Linting - Packages / References

1. [Commitlint](https://commitlint.js.org/)
   1. [conventional changelog](https://github.com/conventional-changelog/commitlint#readme)
1. [Prettier](https://prettier.io/)
1. [TSLint](https://palantir.github.io/tslint/)
   1. [consistent codestyle](https://github.com/ajafff/tslint-consistent-codestyle#rules)
   1. [microsoft contrib](https://github.com/microsoft/tslint-microsoft-contrib#supported-rules)
   1. [tslint react](https://github.com/palantir/tslint-react#rules)

#### Code Quality / Linting - Commands

1. for Commitlint run `$npm run cl`
1. for Prettier run `$npm run prettier`
1. for TSLint run `$npm run lint`
1. for Typescript compilation validation run `$npm run ts:validate`

### Unit Testing

#### Unit Testing - Packages / References

1. [Jest](https://jestjs.io)
   1. [TS Jest](https://github.com/kulshekhar/ts-jest)
1. [React Testing Library](https://testing-library.com/)
1. [Jest DOM](https://github.com/testing-library/jest-dom)

#### Unit Testing - Commands

- for unit tests run `$npm test`
- for unit tests plus code coverage report run `$npm run test:cov`

#### Unit Testing - Reports

- code coverage `/reports/coverage/lcov-report/index.html`

### Build / Deployment / Release

#### Build / Deployment / Release - Packages / References

1. [Typescript compiler](http://www.typescriptlang.org/docs/handbook/compiler-options.html)
1. [Webpack](https://webpack.js.org/)
   1. [ts loader](https://github.com/TypeStrong/ts-loader)
1. [Semantic Release](https://semantic-release.gitbook.io/semantic-release/)
   1. [commit analyzer](https://github.com/semantic-release/commit-analyzer)
   1. [release notes generator](https://github.com/semantic-release/release-notes-generator)
   1. [changelog](https://github.com/semantic-release/changelog)
   1. [git](https://github.com/semantic-release/git)
   1. [github](https://github.com/semantic-release/github)
   1. [npm](https://github.com/semantic-release/npm)
1. [Semantic Versioning](https://semver.org/)
1. [Travis CI](https://docs.travis-ci.com/)
   1. [builds](https://travis-ci.org/antokara/react-recaptcha-x)

#### Build / Deployment / Release - Commands

For the complete build sequence run:

- `$npm run build`

Alternatively, if you want more control:

- to clean the `dist/` directory, run `$npm run build:clean`
- for _declaration files_ generation, run `$npm run build:types`
- for _javascript files_ generation, run `$npm run build:js`
- for _tsc paths_ resolution, run `$npm run build:tscpaths`

Travis CI lints, tests and builds any GitHub branch and PR.
Once the PR gets merged to **master**, Travis CI runs again
and this time, additionally to lint, test and build, the **deploy** stage runs which executes the `semantic-release`.

When Semantic Release runs, it analyzes the git commits and if applicable, it:

1. generates the updated changelog
1. creates a git (release) tag with the appropriate semantic release
   version
1. updates the version in `package.json`
1. commits the file changes and new tag, to the GitHub master branch
1. publishes the new version, to the npm repository with the `latest` tag

There's one final step that needs to be done manually, after we verify the published npm:

- run `$npm dist-tag add react-recaptcha-x@{version} stable`

this will add the `stable` distribution tag, marking the latest release, as the stable one.
