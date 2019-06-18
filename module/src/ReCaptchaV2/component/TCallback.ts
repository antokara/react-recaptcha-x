/**
 * callback type
 *  - when called with string (token), it means successful token retrieved
 *  - when called with false, it means the response expired and the user needs to re-verify
 *  - when called with Error, it means an error occurred and the widget cannot continue
 */
export type TCallback = (token: string | false | Error) => void;
