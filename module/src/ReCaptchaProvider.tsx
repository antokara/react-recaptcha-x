import * as React from 'react';

/**
 * a Provider which must be used once per applcation,
 * to include the Google reCAPTCHA JS API
 */
class ReCaptchaProvider extends React.Component {
  public render(): React.ReactNode {
    return <div>ReCaptchaProvider</div>;
  }
}

export { ReCaptchaProvider };
