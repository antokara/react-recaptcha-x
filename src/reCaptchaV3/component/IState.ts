/**
 * state for ReCaptchaV3 component
 */
export interface IState {
  loaded: boolean;
  token: string | undefined;
  retrieving: boolean;
}
