import { IConsumer } from 'src/provider/IConsumer';
import { ESize } from './ESize';
import { ETheme } from './ETheme';
import { TCallback } from './TCallback';

/**
 * props for ReCaptchaV3 component
 */
export interface IProps extends IConsumer {
  action: string;
  callback: TCallback;
  theme: ETheme;
  size: ESize;
  tabindex: number;
}
