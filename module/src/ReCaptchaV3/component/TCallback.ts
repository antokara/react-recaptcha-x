/**
 * callback type
 *  - when called without arguments, it means requesting token in progress
 *  - when called with string (token), it means token retrieved
 */
export type TCallback = (token: string | void) => void;
