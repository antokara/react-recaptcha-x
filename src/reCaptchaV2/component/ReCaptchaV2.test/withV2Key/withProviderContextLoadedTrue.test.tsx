import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { IContext } from 'src/provider/IContext';
import { ESize } from 'src/reCaptchaV2/component/ESize';
import { ETheme } from 'src/reCaptchaV2/component/ETheme';
import { ReCaptchaV2 } from 'src/reCaptchaV2/component/ReCaptchaV2';
import { TCallback } from 'src/reCaptchaV2/component/TCallback';

describe('ReCaptchaV2 component', (): void => {
  let callback: TCallback;
  let providerContext: IContext;
  let rr: RenderResult;
  let node: ChildNode | null;
  // grecaptcha callbacks to simulate actions
  let grecaptchaCallback: (response: string) => void;
  let grecaptchaExpiredCallback: () => void;
  let grecaptchaErrorCallback: () => void;

  describe('with a V2 site key', (): void => {
    describe('and providerContext.loaded:true', (): void => {
      beforeEach((): void => {
        // mock the google reCaptcha object
        global.grecaptcha = {
          render: jest.fn(
            (
              container: string | HTMLElement,
              parameters?: ReCaptchaV2.Parameters
            ): number => {
              if (parameters) {
                if (parameters.callback) {
                  grecaptchaCallback = parameters.callback;
                }
                if (parameters['expired-callback']) {
                  grecaptchaExpiredCallback = parameters['expired-callback'];
                }
                if (parameters['error-callback']) {
                  grecaptchaErrorCallback = parameters['error-callback'];
                }
              }

              // return a dummy widget id for future testing
              return 10;
            }
          ),
          reset: jest.fn(),
          getResponse: jest.fn(),
          execute: jest.fn()
        };
        callback = jest.fn();
        providerContext = {
          siteKeyV2: 'test',
          siteKeyV3: undefined,
          loaded: true
        };
      });

      describe('and required props', (): void => {
        beforeEach((): void => {
          rr = render(
            <ReCaptchaV2
              callback={callback}
              providerContext={providerContext}
            />
          );
          node = rr.container.firstChild;
        });

        it('renders the div element', (): void => {
          expect(node).toMatchInlineSnapshot('<div />');
        });

        it('invokes the google reCaptcha render once', (): void => {
          expect(global.grecaptcha.render).toHaveBeenCalledTimes(1);
        });

        it('invokes the google reCaptcha render with the proper args', (): void => {
          expect(global.grecaptcha.render).toHaveBeenCalledWith(node, {
            sitekey: providerContext.siteKeyV2,
            callback: expect.any(Function),
            'expired-callback': expect.any(Function),
            'error-callback': expect.any(Function),
            theme: expect.any(String),
            size: expect.any(String),
            tabindex: expect.any(Number)
          });
        });

        describe('when grecaptcha calls "callback"', (): void => {
          beforeEach((): void => {
            grecaptchaCallback('test-token');
          });

          it('invokes props.callback once', (): void => {
            expect(callback).toHaveBeenCalledTimes(1);
          });

          it('invokes props.callback with the token', (): void => {
            expect(callback).toHaveBeenCalledWith('test-token');
          });
        });

        describe('when grecaptcha calls "expired-callback"', (): void => {
          beforeEach((): void => {
            grecaptchaExpiredCallback();
          });

          it('invokes props.callback once', (): void => {
            expect(callback).toHaveBeenCalledTimes(1);
          });

          it('invokes props.callback with "false" arg', (): void => {
            expect(callback).toHaveBeenCalledWith(false);
          });
        });

        describe('when grecaptcha calls "error-callback"', (): void => {
          beforeEach((): void => {
            grecaptchaErrorCallback();
          });

          it('invokes props.callback once', (): void => {
            expect(callback).toHaveBeenCalledTimes(1);
          });

          it('invokes props.callback with "Error" arg', (): void => {
            expect(callback).toHaveBeenCalledWith(new Error());
          });
        });
      });
    });
  });
});
