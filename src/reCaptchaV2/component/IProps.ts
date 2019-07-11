import { ESize } from './ESize';
import { ETheme } from './ETheme';
import { TCallback } from './TCallback';

/**
 * props for ReCaptchaV2 component.
 * includes:
 *  - Context props provided by the Provider component
 *  - HTMLDivElement props
 *  - its own props
 */
interface IProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  callback: TCallback;
  theme?: ETheme;
  size?: ESize;
  tabindex?: number;
}

export { IProps };
