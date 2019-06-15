import * as React from 'react';
import { IConsumer } from 'src/provider/IConsumer';

/**
 * a React reCAPTCHA version 3 component
 */
class ReCaptchaV3 extends React.Component<IConsumer> {
  public render(): React.ReactNode {
    const { providerContext } = this.props;

    return <div>{providerContext.siteKeyV3} ReCaptchaV3</div>;
  }

  // private getTokenV3(): Promise<string> {
  //   const { ready } = this.state;
  //   if (ready) {
  //     // reset any previous stored token and attempt to get a new one
  //     this.setState({
  //       token: undefined,
  //       retrieving: true
  //     });

  //     return grecaptcha.execute(siteKeyV3, { action }).then(
  //       (token: string): Promise<string> => {
  //         this.setState({
  //           token,
  //           retrieving: false
  //         });

  //         return Promise.resolve(token);
  //       }
  //     );
  //   }

  //   return Promise.reject();
  // }
}

export { ReCaptchaV3 };
