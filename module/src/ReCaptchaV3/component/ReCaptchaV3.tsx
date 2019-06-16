import * as React from 'react';
import { IProps } from './IProps';
import { IState } from './IState';

/**
 * a React reCAPTCHA version 3 component
 */
class ReCaptchaV3 extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      token: undefined,
      retrieving: false
    };
    this.getTokenV3 = this.getTokenV3.bind(this);
    this.getTokenV3();
  }

  public componentDidUpdate(prevProps: IProps): void {
    const { loaded } = this.props.providerContext;
    if (prevProps.providerContext.loaded !== loaded && loaded) {
      this.getTokenV3();
    }
  }

  public render(): false {
    return false;
  }

  private getTokenV3(): void {
    const { loaded, siteKeyV3 } = this.props.providerContext;
    const { retrieving } = this.state;
    const { action, callback } = this.props;
    if (loaded && !retrieving) {
      this.setState({
        token: undefined,
        retrieving: true
      });

      // invoke callback without args, to signify retrieving in progress
      callback();

      grecaptcha.execute(siteKeyV3, { action }).then((token: string): void => {
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

export { ReCaptchaV3, IProps };
