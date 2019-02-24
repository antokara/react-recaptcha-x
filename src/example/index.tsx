import * as React from "react";
import { render } from "react-dom";
import { ReactReCaptchaV2V3 } from "../module/ReactReCaptchaV2V3";

class App extends React.Component {
  render() {
    return <ReactReCaptchaV2V3 />;
  }
}

render(<App />, document.getElementById("root"));
