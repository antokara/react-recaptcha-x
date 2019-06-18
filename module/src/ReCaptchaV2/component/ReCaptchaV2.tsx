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
      token: undefined
    };
    this.successCallback = this.successCallback.bind(this);
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
        widgetId: grecaptcha.render(ref.current, {
          sitekey: siteKeyV2,
          callback: this.successCallback
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
        token
      },
      () => {
        // invoke callback with token, to signify success and pass the token
        callback(token);
      }
    );
  }
}

export { ReCaptchaV2, IProps };
