import { TRefreshToken } from './TRefreshToken';

/**
 * callback type
 *  - when called without arguments, it means requesting token in progress
 *  - when called with string (token) and refreshToken, it means token retrieved
 *
 * refreshToken can be deferred and invoked whenever to generate a new token
 */
export type TCallback = (
  token: string | void,
  refreshToken: TRefreshToken | void
) => void;
