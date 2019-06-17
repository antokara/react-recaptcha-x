/**
 * state for ReCaptchaV3 component
 */
export interface IState {
  ref: React.RefObject<HTMLDivElement>;
  token: string | undefined;
  retrieving: boolean;
}
