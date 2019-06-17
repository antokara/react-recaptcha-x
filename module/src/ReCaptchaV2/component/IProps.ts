import { IConsumer } from 'src/provider/IConsumer';
import { TCallback } from './TCallback';

/**
 * props for ReCaptchaV3 component
 */
export interface IProps extends IConsumer {
  action: string;
  callback: TCallback;
}
