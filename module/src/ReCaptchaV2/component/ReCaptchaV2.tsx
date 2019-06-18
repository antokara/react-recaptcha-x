import * as React from 'react';
import { IProps } from './IProps';
import { IState } from './IState';

/**
 * a React reCAPTCHA version 2 component
 */
class ReCaptchaV2 extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      ref: React.createRef<HTMLDivElement>(),
      widgetId: undefined,
      token: undefined,
      expired: false,
      error: false
    };
    this.successCallback = this.successCallback.bind(this);
    this.expiredCallback = this.expiredCallback.bind(this);
    this.errorCallback = this.errorCallback.bind(this);
  }

  /**
   * if js api is loaded and was not previously loaded,
   * attempt to render the widget
   */
  public componentDidUpdate(prevProps: IProps): void {
    const { ref } = this.state;
    const { loaded, siteKeyV2 } = this.props.providerContext;
    if (prevProps.providerContext.loaded !== loaded && loaded && ref.current) {
      // render the widget and store the returned widget id in the state
      this.setState({
        expired: false,
        error: false,
        widgetId: grecaptcha.render(ref.current, {
          sitekey: siteKeyV2,
          callback: this.successCallback,
          'expired-callback': this.expiredCallback,
          'error-callback': this.errorCallback
        })
      });
    }
  }

  public render(): JSX.Element {
    const { ref } = this.state;

    return <div ref={ref} />;
  }

  /**
   * invoked by the widget when the user submits a successful response.
   * The g-recaptcha-response token is provided.
   */
  private successCallback(token: string): void {
    const { callback } = this.props;
    this.setState(
      {
        token,
        expired: false,
        error: false
      },
      () => {
        // invoke callback with token, to signify success and pass the token
        callback(token);
      }
    );
  }

  /**
   * invoked by the widget when the response expired and the user needs to re-verify
   */
  private expiredCallback(): void {
    const { callback } = this.props;
    this.setState(
      {
        expired: true
      },
      () => {
        // invoke callback with false, to signify expiration
        callback(false);
      }
    );
  }

  /**
   * invoked by the widget when an error occurrs (usually network connectivity) and
   * it cannot continue until connectivity is restored.
   */
  private errorCallback(): void {
    const { callback } = this.props;
    this.setState(
      {
        error: true
      },
      () => {
        // invoke callback with false, to signify expiration
        callback(new Error());
      }
    );
  }
}

export { ReCaptchaV2, IProps };
