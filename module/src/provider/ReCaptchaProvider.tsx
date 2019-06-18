import * as React from 'react';
import { Context } from './Context';
import { IContext } from './IContext';

declare global {
  // tslint:disable-next-line:interface-name (@see https://github.com/Microsoft/TypeScript/issues/19816)
  interface Window {
    GoogleReCaptcha_onload: Function;
  }
}

type TProps = {
  siteKeyV2: string;
  siteKeyV3: string;
  children: React.ReactNode | React.ReactNodeArray;
};
type TState = {
  loaded: boolean;
};

/**
 * a Provider which must be used once per application,
 * to include the Google reCAPTCHA JS API
 */
class ReCaptchaProvider extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      loaded: false
    };
    this.onLoadHandler = this.onLoadHandler.bind(this);
    window.GoogleReCaptcha_onload = this.onLoadHandler;
  }

  public componentDidMount(): void {
    const { siteKeyV3 } = this.props;
    // avoid loading again if previously loaded...
    // tslint:disable-next-line:no-typeof-undefined (@see https://github.com/Microsoft/tslint-microsoft-contrib/issues/415)
    if (typeof grecaptcha === 'undefined') {
      // load the Google reCAPTCHA JS API script tag.
      // We cannot dynamically import because
      // there are no CORS headers and the FETCH will fail if we try...
      const script: HTMLScriptElement = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKeyV3}&onload=GoogleReCaptcha_onload`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }

  public render(): React.ReactNode {
    const { children, siteKeyV3, siteKeyV2 } = this.props;
    const { loaded } = this.state;
    const contextValue: IContext = {
      siteKeyV2,
      siteKeyV3,
      loaded
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  }

  /**
   * invoked when the Google reCAPTCHA JS API is loaded
   * to set the loaded state
   * @see componentDidMount
   */
  private onLoadHandler(): void {
    delete window.GoogleReCaptcha_onload;
    this.setState({ loaded: true });
  }
}

export { ReCaptchaProvider };
