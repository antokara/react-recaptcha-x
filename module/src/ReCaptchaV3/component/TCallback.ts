/**
 * callback type
 *  - when called without arguments, it means requesting token
 *  - when called with string (token), it means successful token retrieved
 */
export type TCallback = (token: string | void) => void;
