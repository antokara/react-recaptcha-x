import * as React from 'react';
import { IContext } from './provider/IContext';
import { withContext } from './provider/withContext';

type Props = {
  providerContext: IContext;
};

/**
 * a React reCAPTCHA version 3 component
 */
class ReCaptchaV extends React.Component<Props> {
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
const ReCaptchaV3: React.FunctionComponent = withContext(ReCaptchaV);
export { ReCaptchaV3 };
