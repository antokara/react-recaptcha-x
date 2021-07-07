// enable Jest DOM custom matchers
// @see https://github.com/testing-library/jest-dom#usage
import '@testing-library/jest-dom/extend-expect';

// augment the global interface with the "grecaptcha" object
// so that it can be mocked in our tests
declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
      grecaptcha: ReCaptchaV2.ReCaptcha;
    }
  }
}
