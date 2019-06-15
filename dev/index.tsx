import { ReCaptchaProvider, ReCaptchaV2, ReCaptchaV3 } from 'module/index';
import * as React from 'react';
import { render } from 'react-dom';

/**
 * the main component of our development application
 * which is used to demo & develop our react module on-the-fly
 */
class App extends React.PureComponent {
  public render(): React.ReactNode {
    return (
      <ReCaptchaProvider siteKeyV3={process.env.RE_CAPTCHA_V3_SITE_KEY}>
        <ReCaptchaV2 />
        <ReCaptchaV3 test="testing own props" providerContext={false} />
        <div>my demo app</div>
      </ReCaptchaProvider>
    );
  }
}

render(<App />, document.getElementById('root'));
