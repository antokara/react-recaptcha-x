import * as React from 'react';
import { withContext } from 'src/provider/withContext';
import { ReCaptchaV3 as Component } from 'src/ReCaptchaV3/component/ReCaptchaV3';

// provide access to the provider context
const ReCaptchaV3: React.FunctionComponent = withContext(Component);

export { ReCaptchaV3 };
