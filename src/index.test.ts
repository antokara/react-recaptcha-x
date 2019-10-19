import { ReCaptchaProvider as OriginPathReCaptchaProvider } from './provider/ReCaptchaProvider';
import { ESize } from './reCaptchaV2/component/ESize';
import { ETheme } from './reCaptchaV2/component/ETheme';
import { TCallback as TCallbackV2 } from './reCaptchaV2/component/TCallback';
import { ReCaptchaV2 as OriginPathReCaptchaV2 } from './reCaptchaV2/container/ReCaptchaV2';
import { TCallback as TCallbackV3 } from './reCaptchaV3/component/TCallback';
import { ReCaptchaV3 as OriginPathReCaptchaV3 } from './reCaptchaV3/container/ReCaptchaV3';

import {
  EReCaptchaV2Size,
  EReCaptchaV2Theme,
  ReCaptchaProvider,
  ReCaptchaV2,
  ReCaptchaV3,
  TReCaptchaV2Callback,
  TReCaptchaV3Callback
} from './index';

describe('index', () => {
  it('re-exports ESize as EReCaptchaV2Size', () => {
    expect(EReCaptchaV2Size).toStrictEqual(ESize);
  });

  it('re-exports ETheme as EReCaptchaV2Theme', () => {
    expect(EReCaptchaV2Theme).toStrictEqual(ETheme);
  });

  it('re-exports ReCaptchaProvider', () => {
    expect(ReCaptchaProvider).toStrictEqual(OriginPathReCaptchaProvider);
  });

  it('re-exports ReCaptchaV2', () => {
    expect(ReCaptchaV2).toStrictEqual(OriginPathReCaptchaV2);
  });

  it('re-exports ReCaptchaV3', () => {
    expect(ReCaptchaV3).toStrictEqual(OriginPathReCaptchaV3);
  });

  it('re-exports TCallbackV2 as TReCaptchaV2Callback', () => {
    const callback: TReCaptchaV2Callback | TCallbackV2 = (
      token: string | false | Error
    ): void => {
      return;
    };
    expect(callback).toBeTruthy();
  });

  it('re-exports TCallbackV3 as TReCaptchaV3Callback', () => {
    const callback: TReCaptchaV3Callback | TCallbackV3 = (
      token: string | void
    ): void => {
      return;
    };
    expect(callback).toBeTruthy();
  });
});
