import * as React from 'react';

/**
 * a Provider which must be used once per applcation,
 * to include the Google reCAPTCHA JS API
 */
class Provider extends React.Component {
  public render(): React.ReactNode {
    return <div>Provider</div>;
  }
}

export { Provider };
