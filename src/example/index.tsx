import * as React from 'react';
import { render } from 'react-dom';
import { ReactReCaptchaV2V3 } from '../module/ReactReCaptchaV3V2';

/**
 * the main Application component
 */
class App extends React.PureComponent {
  public render(): React.ReactNode {
    return <ReactReCaptchaV2V3 />;
  }
}

render(<App />, document.getElementById('root'));
