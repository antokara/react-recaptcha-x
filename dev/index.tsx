import {
  ReCaptchaProvider,
  ReCaptchaV2,
  ReCaptchaV3,
  TReCaptchaV2Callback,
  TReCaptchaV3Callback
} from 'module/index';
import * as React from 'react';
import { render } from 'react-dom';

// app state
interface IState {
  v2TokenA: string | undefined;
  v2Expired: boolean;
  v2Error: boolean;
  v3TokenA: string | undefined;
  v3TokenB: string | undefined;
  v3RetrievingA: boolean;
  v3RetrievingB: boolean;
}

/**
 * the main component of our development application
 * which is used to demo & develop our react module on-the-fly
 */
class App extends React.PureComponent<{}, IState> {
  public constructor(props: {}) {
    super(props);
    this.v2CallbackA = this.v2CallbackA.bind(this);
    this.v3CallbackA = this.v3CallbackA.bind(this);
    this.v3CallbackB = this.v3CallbackB.bind(this);
    this.state = {
      v2TokenA: undefined,
      v2Expired: false,
      v2Error: false,
      v3TokenA: undefined,
      v3TokenB: undefined,
      v3RetrievingA: false,
      v3RetrievingB: false
    };
  }

  public render(): React.ReactNode {
    const {
      v2TokenA,
      v2Expired,
      v2Error,
      v3TokenA,
      v3TokenB,
      v3RetrievingA,
      v3RetrievingB
    } = this.state;

    return (
      <ReCaptchaProvider
        siteKeyV2={process.env.RE_CAPTCHA_V2_SITE_KEY}
        siteKeyV3={process.env.RE_CAPTCHA_V3_SITE_KEY}
      >
        <div data-test="dummy wrapper to demonstrate react context">
          <h1>my demo app</h1>

          <hr />
          <h2>ReCaptcha V2</h2>
          <ReCaptchaV2 callback={this.v2CallbackA} />
          <h6>Token: {v2TokenA}</h6>
          <h6>Expired: {v2Expired}</h6>
          <h6>Error: {v2Error}</h6>

          <hr />
          <h2>ReCaptcha V3 - ActionA</h2>
          <ReCaptchaV3 action="actionA" callback={this.v3CallbackA} />
          <h3>Retrieving: {v3RetrievingA ? 'yes' : 'no'}</h3>
          <h6>Token: {v3TokenA}</h6>

          <hr />
          <h2>ReCaptcha V3 - ActionB</h2>
          <ReCaptchaV3 action="actionB" callback={this.v3CallbackB} />
          <h3>Retrieving: {v3RetrievingB ? 'yes' : 'no'}</h3>
          <h6>Token: {v3TokenB}</h6>
        </div>
      </ReCaptchaProvider>
    );
  }

  private v2CallbackA(token: string | false | Error): TReCaptchaV2Callback {
    if (typeof token === 'string') {
      this.setState({
        v2TokenA: token,
        v2Expired: false,
        v2Error: false
      });
    } else if (typeof token === 'boolean' && !token) {
      this.setState({
        v2Expired: true
      });
    } else if (token instanceof Error) {
      this.setState({
        v2Error: true
      });
    }
  }

  private v3CallbackA(token: string | void): TReCaptchaV3Callback {
    if (typeof token === 'string') {
      // retrieved
      this.setState({
        v3TokenA: token,
        v3RetrievingA: false
      });
    } else {
      // retrieval in progress
      this.setState({
        v3RetrievingA: true
      });
    }
  }

  private v3CallbackB(token: string | void): TReCaptchaV3Callback {
    if (typeof token === 'string') {
      // retrieved
      this.setState({
        v3TokenB: token,
        v3RetrievingB: false
      });
    } else {
      // retrieval in progress
      this.setState({
        v3RetrievingB: true
      });
    }
  }
}

render(<App />, document.getElementById('root'));
