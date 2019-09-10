import * as React from 'react';
import { withContext } from '../../provider/withContext';
import { IProps } from '../../reCaptchaV3/component/IProps';
import { ReCaptchaV3 as Component } from '../../reCaptchaV3/component/ReCaptchaV3';

// provide access to the provider context
const ReCaptchaV3: React.ComponentType<IProps> = withContext(Component);

export { ReCaptchaV3 };
