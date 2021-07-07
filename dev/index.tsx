import {
  EReCaptchaV2Size,
  EReCaptchaV2Theme,
  ReCaptchaProvider,
  ReCaptchaV2,
  ReCaptchaV3,
  TReCaptchaV3RefreshToken
} from 'module/index';
import { TRefreshToken } from 'module/reCaptchaV3/component/TRefreshToken';
import * as React from 'react';
import { render } from 'react-dom';

// app state
interface IState {
  providerVisible: boolean;
  v2TokenA: string | undefined;
  v2ExpiredA: boolean;
  v2ErrorA: boolean;
  v2TokenB: string | undefined;
  v2ExpiredB: boolean;
  v2ErrorB: boolean;
  v2VisibleB: boolean;
  v3TokenA: string | undefined;
  v3TokenB: string | undefined;
  v3RefreshTokenA?: TReCaptchaV3RefreshToken;
  v3RefreshTokenB?: TReCaptchaV3RefreshToken;
  v3RetrievingA: boolean;
  v3RetrievingB: boolean;
}

/**
 * the main component of our development application
 * which is used to demo & develop our react module on-the-fly
 */
class App extends React.PureComponent<Record<string, unknown>, IState> {
  public constructor(props: Record<string, unknown>) {
    super(props);
    this.toggleProvider = this.toggleProvider.bind(this);
    this.v2CallbackA = this.v2CallbackA.bind(this);
    this.v2CallbackB = this.v2CallbackB.bind(this);
    this.v3CallbackA = this.v3CallbackA.bind(this);
    this.v3CallbackB = this.v3CallbackB.bind(this);
    this.state = {
      providerVisible: true,
      v2TokenA: undefined,
      v2ExpiredA: false,
      v2ErrorA: false,
      v2TokenB: undefined,
      v2ExpiredB: false,
      v2ErrorB: false,
      v3TokenA: undefined,
      v3TokenB: undefined,
      v2VisibleB: false,
      v3RetrievingA: false,
      v3RetrievingB: false,
      v3RefreshTokenA: undefined,
      v3RefreshTokenB: undefined
    };

    // render the v2 B widget with a delay
    setTimeout(
      (): void =>
        this.setState({
          v2VisibleB: true
        }),
      2000
    );
  }

  public render(): React.ReactNode {
    const {
      providerVisible,
      v2TokenA,
      v2ExpiredA,
      v2ErrorA,
      v2TokenB,
      v2ExpiredB,
      v2ErrorB,
      v3TokenA,
      v3TokenB,
      v3RetrievingA,
      v3RetrievingB,
      v2VisibleB
    } = this.state;

    let RefreshTokenA: React.ReactNode | null;
    if (this.state.v3RefreshTokenA) {
      RefreshTokenA = (
        <button onClick={this.state.v3RefreshTokenA}>refresh token</button>
      );
    }

    let RefreshTokenB: React.ReactNode | null;
    if (this.state.v3RefreshTokenB) {
      RefreshTokenB = (
        <button onClick={this.state.v3RefreshTokenB}>refresh token</button>
      );
    }

    return (
      <>
        <button onClick={this.toggleProvider}>toggle provider</button>
        {providerVisible && (
          <ReCaptchaProvider
            siteKeyV2={process.env.RE_CAPTCHA_V2_SITE_KEY}
            siteKeyV3={process.env.RE_CAPTCHA_V3_SITE_KEY}
          >
            <div data-test="dummy wrapper to demonstrate react context">
              <h1>my demo app</h1>

              <hr />
              <h2>ReCaptcha V2 - A</h2>
              <ReCaptchaV2
                id="my-id"
                className="test"
                data-test-id="my-test-id"
                callback={this.v2CallbackA}
                theme={EReCaptchaV2Theme.Light}
                size={EReCaptchaV2Size.Normal}
              />
              <h6>Token: {v2TokenA}</h6>
              <h6>Expired: {v2ExpiredA ? 'yes' : 'no'}</h6>
              <h6>Error: {v2ErrorA ? 'yes' : 'no'}</h6>

              <hr />
              <h2>ReCaptcha V2 - B (delayed render)</h2>
              {v2VisibleB && (
                <ReCaptchaV2
                  callback={this.v2CallbackB}
                  theme={EReCaptchaV2Theme.Dark}
                  size={EReCaptchaV2Size.Compact}
                  tabindex={0}
                />
              )}
              <h6>Token: {v2TokenB}</h6>
              <h6>Expired: {v2ExpiredB ? 'yes' : 'no'}</h6>
              <h6>Error: {v2ErrorB ? 'yes' : 'no'}</h6>

              <hr />
              <h2>ReCaptcha V3 - ActionA</h2>
              <ReCaptchaV3 action="actionA" callback={this.v3CallbackA} />
              <h3>Retrieving: {v3RetrievingA ? 'yes' : 'no'}</h3>
              <h6>Token: {v3TokenA}</h6>
              {RefreshTokenA}

              <hr />
              <h2>ReCaptcha V3 - ActionB</h2>
              <ReCaptchaV3 action="actionB" callback={this.v3CallbackB} />
              <h3>Retrieving: {v3RetrievingB ? 'yes' : 'no'}</h3>
              <h6>Token: {v3TokenB}</h6>
              {RefreshTokenB}
            </div>
          </ReCaptchaProvider>
        )}
      </>
    );
  }

  private v2CallbackA(token: string | false | Error): void {
    if (typeof token === 'string') {
      this.setState({
        v2TokenA: token,
        v2ExpiredA: false,
        v2ErrorA: false
      });
    } else if (typeof token === 'boolean' && !token) {
      this.setState({
        v2ExpiredA: true
      });
    } else if (token instanceof Error) {
      this.setState({
        v2ErrorA: true
      });
    }
  }

  private v2CallbackB(token: string | false | Error): void {
    if (typeof token === 'string') {
      this.setState({
        v2TokenB: token,
        v2ExpiredB: false,
        v2ErrorB: false
      });
    } else if (typeof token === 'boolean' && !token) {
      this.setState({
        v2ExpiredB: true
      });
    } else if (token instanceof Error) {
      this.setState({
        v2ErrorB: true
      });
    }
  }

  private v3CallbackA(
    token: string | void,
    refreshToken: TRefreshToken | void
  ): void {
    if (typeof token === 'string' && refreshToken) {
      // retrieved
      this.setState({
        v3TokenA: token,
        v3RetrievingA: false,
        v3RefreshTokenA: refreshToken
      });
    } else {
      // retrieval in progress
      this.setState({
        v3RetrievingA: true
      });
    }
  }

  private v3CallbackB(
    token: string | void,
    refreshToken: TRefreshToken | void
  ): void {
    if (typeof token === 'string' && refreshToken) {
      // retrieved
      this.setState({
        v3TokenB: token,
        v3RetrievingB: false,
        v3RefreshTokenB: refreshToken
      });
    } else {
      // retrieval in progress
      this.setState({
        v3RetrievingB: true
      });
    }
  }

  /**
   * toggles the visibility of the provider to trigger unmount/mount on demand for testing
   */
  private toggleProvider(): void {
    const { providerVisible } = this.state;
    this.setState({
      providerVisible: !providerVisible
    });
  }
}

render(<App />, document.getElementById('root'));
