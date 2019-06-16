import * as React from 'react';
import { withContext } from 'src/provider/withContext';
import { IProps } from 'src/ReCaptchaV3/component/IProps';
import { ReCaptchaV3 as Component } from 'src/ReCaptchaV3/component/ReCaptchaV3';

// provide access to the provider context
const ReCaptchaV3: React.ComponentType<IProps> = withContext(Component);

export { ReCaptchaV3 };
