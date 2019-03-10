import * as React from 'react';

type Props = {
  siteKeyV3: string;
};

/**
 * a Provider which must be used once per application,
 * to include the Google reCAPTCHA JS API
 */
class ReCaptchaProvider extends React.Component<Props> {
  public componentDidMount(): void {
    const { siteKeyV3 } = this.props;
    // load the Google reCAPTCHA JS API script tag.
    // We cannot dynamically import because
    // there are no CORS headers and the FETCH will fail if we try...
    const script: HTMLScriptElement = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKeyV3}&onload=GoogleReCaptchaV3_onload`;
    document.body.appendChild(script);
  }

  public render(): React.ReactNode {
    return <div>ReCaptchaProvider</div>;
  }
}

export { ReCaptchaProvider };
