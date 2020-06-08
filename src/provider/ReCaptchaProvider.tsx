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
  siteKeyV2?: string;
  siteKeyV3?: string;
  langCode?: string;
  hideV3Badge?: boolean;
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
  }

  public componentDidMount(): void {
    const {
      siteKeyV3 = 'explicit',
      langCode = '',
      hideV3Badge = false
    } = this.props;
    window.GoogleReCaptcha_onload = this.onLoadHandler;
    const scriptDataId: string = 'react-recaptcha-v3-v2-script';
    // avoid loading again if previously loaded...
    if (document.querySelector(`script[data-id="${scriptDataId}"]`) === null) {
      // load the Google reCAPTCHA JS API script tag.
      // We cannot dynamically import because
      // there are no CORS headers and the FETCH will fail if we try...
      const script: HTMLScriptElement = document.createElement('script');
      script.setAttribute('data-id', scriptDataId);
      script.setAttribute(
        'src',
        `https://www.google.com/recaptcha/api.js?render=${siteKeyV3}&onload=GoogleReCaptcha_onload&hl=${langCode}`
      );
      script.setAttribute('async', 'true');
      script.setAttribute('defer', 'true');
      document.body.appendChild(script);
    } else if (typeof grecaptcha === 'object') {
      this.setState({ loaded: true });
    }

    // in the case user wants to hide the reCaptchaV3 badge and
    // if it wasn't previously appended...
    // @see https://developers.google.com/recaptcha/docs/faq
    const styleDataId: string = 'react-recaptcha-v3-v2-style';
    if (
      hideV3Badge &&
      document.querySelector(`style[data-id="${styleDataId}"]`) === null
    ) {
      const style: HTMLStyleElement = document.createElement('style');
      // tslint:disable-next-line:no-inner-html (this is safe, there is no user input)
      style.innerHTML = '.grecaptcha-badge{display: none;}';
      style.setAttribute('data-id', styleDataId);
      document.body.appendChild(style);
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
