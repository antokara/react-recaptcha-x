import {
  ReCaptchaProvider,
  ReCaptchaV2,
  ReCaptchaV3,
  TReCaptchaV3Callback
} from 'module/index';
import * as React from 'react';
import { render } from 'react-dom';

interface IState {
  v3Token: string | undefined;
  v3Retrieving: boolean;
}

/**
 * the main component of our development application
 * which is used to demo & develop our react module on-the-fly
 */
class App extends React.PureComponent<{}, IState> {
  public constructor(props: {}) {
    super(props);
    this.v3Callback = this.v3Callback.bind(this);
    this.state = {
      v3Token: undefined,
      v3Retrieving: false
    };
  }

  public render(): React.ReactNode {
    const { v3Token, v3Retrieving } = this.state;

    return (
      <ReCaptchaProvider siteKeyV3={process.env.RE_CAPTCHA_V3_SITE_KEY}>
        <ReCaptchaV2 />
        <ReCaptchaV3 action="testAction" callback={this.v3Callback} />
        <h1>my demo app</h1>

        <hr />
        <h2>ReCaptcha V3</h2>
        <h3>Retrieving: {v3Retrieving ? 'yes' : 'no'}</h3>
        <h6>Token: {v3Token}</h6>
      </ReCaptchaProvider>
    );
  }

  private v3Callback(token: string | void): TReCaptchaV3Callback {
    if (token) {
      // retrieved
      this.setState({
        v3Token: token,
        v3Retrieving: false
      });
    } else {
      // retrieval in progress
      this.setState({
        v3Retrieving: true
      });
    }
  }
}

render(<App />, document.getElementById('root'));
