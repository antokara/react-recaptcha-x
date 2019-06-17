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
      token: undefined,
      retrieving: false
    };
    this.getToken = this.getToken.bind(this);
  }

  public componentDidUpdate(prevProps: IProps): void {
    const { ref } = this.state;
    const { loaded } = this.props.providerContext;
    if (prevProps.providerContext.loaded !== loaded && loaded && ref.current) {
      grecaptcha.render(ref.current);
    }
  }

  public render(): JSX.Element {
    const { siteKeyV2 } = this.props.providerContext;
    const { ref } = this.state;

    return <div ref={ref} data-sitekey={siteKeyV2} />;
  }

  private getToken(): void {
    const { loaded, siteKeyV2 } = this.props.providerContext;
    const { retrieving } = this.state;
    const { action, callback } = this.props;
    if (loaded && !retrieving) {
      this.setState({
        token: undefined,
        retrieving: true
      });

      // invoke callback without args, to signify retrieving in progress
      callback();

      grecaptcha.execute(siteKeyV2, { action }).then((token: string): void => {
        this.setState({
          token,
          retrieving: false
        });
        // invoke callback with token, to signify success and pass the token
        callback(token);
      });
    }
  }
}

export { ReCaptchaV2, IProps };
