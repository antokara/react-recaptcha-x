import * as React from 'react';
import { Context } from './provider/Context';
import { IContext } from './provider/IContext';
import { withContext } from './provider/withContext';
// import { Context } from './provider/ContextConsumer';
// import { ContextType } from './provider/ContextType';

/**
 * a React reCAPTCHA version 3 component
 */
class ReCaptchaV3 extends React.Component {
  public render(): React.ReactNode {
    return (
      <Context.Consumer>
        {(context: IContext): React.ReactNode =>
          context && <div>{context.siteKeyV3} ReCaptchaV3</div>
        }
      </Context.Consumer>
    );
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

export { withContext(ReCaptchaV3) };
