import * as React from 'react';
import { IConsumer } from 'src/provider/IConsumer';
import { withContext } from 'src/provider/withContext';
import { ReCaptchaV3 as Component } from 'src/ReCaptchaV3/component/ReCaptchaV3';

// provide access to the provider context
const ReCaptchaV3: React.ComponentType<IConsumer> = withContext(Component);

export { ReCaptchaV3 };
