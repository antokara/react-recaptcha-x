import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { IContext } from 'src/provider/IContext';
import { ReCaptchaV3 } from 'src/reCaptchaV3/component/ReCaptchaV3';
import { TCallback } from 'src/reCaptchaV3/component/TCallback';
import { TRefreshToken } from 'src/reCaptchaV3/component/TRefreshToken';

// mocked global functions types
declare let global: {
  grecaptcha: {
    render: jest.Mock;
    reset: jest.Mock;
    getResponse: jest.Mock;
    execute: jest.Mock<(siteKey: string, options?: options) => Promise<string>>;
  };
};

describe('ReCaptchaV3 component', (): void => {
  let callback: jest.Mock<TCallback>;
  let refreshTokenFn: TRefreshToken | undefined;
  let providerContext: IContext;
  let rr: RenderResult;
  let node: ChildNode | null;

  describe('with a V3 site key but providerContext.loaded:true', (): void => {
    beforeEach((): void => {
      callback = jest
        .fn()
        .mockImplementation(
          (token: string | void, refreshToken: TRefreshToken | void): void => {
            if (refreshToken) {
              refreshTokenFn = refreshToken;
            }
          }
        );
      refreshTokenFn = undefined;
      // mock the google reCaptcha object
      global.grecaptcha = {
        render: jest.fn(),
        reset: jest.fn(),
        getResponse: jest.fn(),
        execute: jest
          .fn()
          .mockImplementation(
            (siteKey: string, options?: options): Promise<string> =>
              Promise.resolve('test-token')
          )
      };
      providerContext = {
        siteKeyV2: undefined,
        siteKeyV3: 'test',
        loaded: true
      };
      rr = render(
        <ReCaptchaV3
          action="test-action"
          callback={callback}
          providerContext={providerContext}
        />
      );
      node = rr.container.firstChild;
    });

    it('renders nothing', (): void => {
      expect(node).toBeFalsy();
    });

    it('invokes the google reCaptcha execute once', (): void => {
      expect(global.grecaptcha.execute).toHaveBeenCalledTimes(1);
    });

    it('invokes the callback twice', (): void => {
      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('invokes the callback without any arguments', (): void => {
      expect(callback).toHaveBeenNthCalledWith(1);
    });

    it('invokes the callback with the token and refreshToken function', (): void => {
      expect(callback).toHaveBeenNthCalledWith(
        2,
        'test-token',
        expect.any(Function)
      );
    });

    it('sets the refresh token function', (): void => {
      expect(refreshTokenFn).toBeInstanceOf(Function);
    });

    describe('refresh token function', (): void => {
      beforeEach((): void => {
        global.grecaptcha.execute.mockClear();
        if (refreshTokenFn) {
          refreshTokenFn();
        }
      });

      it('invokes the google reCaptcha execute once', (): void => {
        expect(global.grecaptcha.execute).toHaveBeenCalledTimes(1);
      });
    });
  });
});
