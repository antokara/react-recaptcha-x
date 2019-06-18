/**
 * state for ReCaptchaV3 component
 */
export interface IState {
  ref: React.RefObject<HTMLDivElement>;
  widgetId: number | undefined;
  token: string | undefined;
}
