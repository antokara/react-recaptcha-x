import { IConsumer } from 'src/provider/IConsumer';
import { ESize } from './ESize';
import { ETheme } from './ETheme';
import { TCallback } from './TCallback';

/**
 * props for ReCaptchaV2 component
 */
export interface IProps extends IConsumer {
  callback: TCallback;
  theme: ETheme;
  size: ESize;
  tabindex: number;
}
