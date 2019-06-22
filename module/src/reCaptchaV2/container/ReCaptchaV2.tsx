import * as React from 'react';
import { withContext } from 'src/provider/withContext';
import { IProps } from 'src/reCaptchaV2/component/IProps';
import { ReCaptchaV2 as Component } from 'src/reCaptchaV2/component/ReCaptchaV2';

// provide access to the provider context
const ReCaptchaV2: React.ComponentType<IProps> = withContext(Component);

export { ReCaptchaV2 };
