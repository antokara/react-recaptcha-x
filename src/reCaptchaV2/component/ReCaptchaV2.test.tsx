import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { IContext } from 'src/provider/IContext';
import { ESize } from './ESize';
import { ETheme } from './ETheme';
import { ReCaptchaV2 } from './ReCaptchaV2';
import { TCallback } from './TCallback';

describe('ReCaptchaV2 component', () => {
  let callback: TCallback;
  let providerContext: IContext;
  let rr: RenderResult;
  let node: ChildNode | null;
  let grecaptchaCallback: (response: string) => void;

  describe('without the V2 site key', () => {
    beforeEach(() => {
      callback = jest.fn();
      providerContext = {
        siteKeyV2: undefined,
        siteKeyV3: undefined,
        loaded: false
      };
    });

    it('throws an Error', () => {
      expect(
        () =>
          new ReCaptchaV2({
            callback,
            providerContext: providerContext
          })
      ).toThrow(
        'The prop "siteKeyV2" must be set on the ReCaptchaProvider before using the ReCaptchaV2 component'
      );
    });
  });

  describe('with a V2 site key', () => {
    beforeEach(() => {
      callback = jest.fn();
      providerContext = {
        siteKeyV2: 'test',
        siteKeyV3: undefined,
        loaded: false
      };
    });

    describe('and required props', () => {
      beforeEach(() => {
        rr = render(
          <ReCaptchaV2 callback={callback} providerContext={providerContext} />
        );
        node = rr.container.firstChild;
      });

      it('renders the div element', () => {
        expect(node).toMatchInlineSnapshot('<div />');
      });

      describe('when providerContext.loaded changes to true', () => {
        beforeEach(() => {
          // mock the google reCaptcha object
          global.grecaptcha = {
            render: jest.fn(
              (
                container: string | HTMLElement,
                parameters?: ReCaptchaV2.Parameters
              ): number => {
                if (parameters && parameters.callback) {
                  grecaptchaCallback = parameters.callback;
                }

                // return a dummy widget id for future testing
                return 10;
              }
            ),
            reset: jest.fn(),
            getResponse: jest.fn(),
            execute: jest.fn()
          };
          // change loaded to true
          providerContext = {
            ...providerContext,
            loaded: true
          };
          rr.rerender(
            <ReCaptchaV2
              callback={callback}
              providerContext={providerContext}
            />
          );
        });

        it('invokes the google reCaptcha render once', () => {
          expect(global.grecaptcha.render).toHaveBeenCalledTimes(1);
        });

        it('invokes the google reCaptcha render with the proper args', () => {
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

        describe('when grecaptcha calls "callback"', () => {
          beforeEach(() => {
            grecaptchaCallback('test-token');
          });

          it('invokes props.callback once', () => {
            expect(callback).toHaveBeenCalledTimes(1);
          });

          it('invokes props.callback with the token', () => {
            expect(callback).toHaveBeenCalledWith('test-token');
          });
        });
      });
    });

    describe('and optional props', () => {
      beforeEach(() => {
        rr = render(
          <ReCaptchaV2
            callback={callback}
            theme={ETheme.Light}
            tabindex={0}
            size={ESize.Normal}
            providerContext={providerContext}
            className="test-class-name"
            id="test-id"
            data-test-id="data-test-id"
          />
        );
        node = rr.container.firstChild;
      });

      it('renders the div element', () => {
        expect(node).toMatchInlineSnapshot(`
          <div
            class="test-class-name"
            data-test-id="data-test-id"
            id="test-id"
          />
        `);
      });

      it('it has the class attribute', () => {
        expect(node).toHaveClass('test-class-name');
      });

      it('it has the data-test-id attribute', () => {
        expect(node).toHaveAttribute('data-test-id', 'data-test-id');
      });

      it('it has the id attribute', () => {
        expect(node).toHaveAttribute('id', 'test-id');
      });
    });
  });
});
