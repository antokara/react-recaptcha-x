import * as React from 'react';
import { Context } from './Context';
import { IContext } from './IContext';

declare global {
  // tslint:disable-next-line:interface-name (@see https://github.com/Microsoft/TypeScript/issues/19816)
  interface Window {
    GoogleReCaptcha_onload?: Function;
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
    const scriptDataId: string = 'react-recaptcha-v3-v2-script';
    // avoid loading again if previously loaded...
    if (document.querySelector(`script[data-id="${scriptDataId}"]`) === null) {
      // load the Google reCAPTCHA JS API script tag.
      // We cannot dynamically import because
      // there are no CORS headers and the FETCH will fail if we try...
      window.GoogleReCaptcha_onload = this.onLoadHandler;
      const script: HTMLScriptElement = document.createElement('script');
      script.setAttribute('data-id', scriptDataId);
      script.setAttribute(
        'src',
        `https://www.google.com/recaptcha/api.js?render=${siteKeyV3}&onload=GoogleReCaptcha_onload&hl=${langCode}`
      );
      script.setAttribute('async', 'true');
      script.setAttribute('defer', 'true');
      document.body.appendChild(script);
    } else if (window.GoogleReCaptcha_onload) {
      // in case the provider was previously mounted, then unmounted before invoking
      // our Google reCAPTCHA onload handler, replace the onload handler with the provider's
      // so that we can capture then event,set the loaded state and propagate the event...
      window.GoogleReCaptcha_onload = this.onLoadHandler;
    } else {
      // in case the provider was previously mounted, then unmounted but
      // had also invoked our Google reCAPTCHA onload handler, only then, change to already loaded
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

  /**
   * in case we unmount while the Google reCAPTCHA JS API was loading,
   * meaning, our GoogleReCaptcha_onload hasn't been triggered yet,
   * make sure when it does trigger, it does not throw and is handled properly...
   */
  public componentWillUnmount(): void {
    if (window.GoogleReCaptcha_onload) {
      window.GoogleReCaptcha_onload = (): void => {
        // remove the onload handler since it got used
        delete window.GoogleReCaptcha_onload;
      };
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
   * see componentDidMount
   */
  private onLoadHandler(): void {
    // remove the onload handler since it got used
    delete window.GoogleReCaptcha_onload;
    // propagate the loaded event/state
    this.setState({ loaded: true });
  }
}

export { ReCaptchaProvider };
