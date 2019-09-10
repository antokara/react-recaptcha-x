import * as React from 'react';
import { withContext } from '../../provider/withContext';
import { IProps } from '../../reCaptchaV2/component/IProps';
import { ReCaptchaV2 as Component } from '../../reCaptchaV2/component/ReCaptchaV2';

// provide access to the provider context
const ReCaptchaV2: React.ComponentType<IProps> = withContext(Component);

export { ReCaptchaV2 };
