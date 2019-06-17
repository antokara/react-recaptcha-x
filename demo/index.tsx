import * as React from 'react';
import { render } from 'react-dom';
import { ReCaptchaProvider } from 'react-recaptcha-v3-v2';

/**
 * the main component of our demo application
 * which is used to demo our react module as it can be used in production
 */
class App extends React.PureComponent {
  public render(): React.ReactNode {
    return <ReCaptchaProvider />;
  }
}

render(<App />, document.getElementById('root'));
