/**
 * state for ReCaptchaV2 component
 */
export interface IState {
  ref: React.RefObject<HTMLDivElement>;
  widgetId: number | undefined;
  token: string | undefined;
  expired: boolean;
  error: boolean;
}
