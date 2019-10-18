import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { IContext } from 'src/provider/IContext';
import { ReCaptchaV3 } from './ReCaptchaV3';
import { TCallback } from './TCallback';

describe('ReCaptchaV3 component', () => {
  let callback: jest.Mock<TCallback>;
  let providerContext: IContext;
  let rr: RenderResult;
  let node: ChildNode | null;

  describe('without the V3 site key', () => {
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
          new ReCaptchaV3({
            action: 'test-action',
            callback,
            providerContext: providerContext
          })
      ).toThrow(
        'The prop "siteKeyV3" must be set on the ReCaptchaProvider before using the ReCaptchaV3 component'
      );
    });
  });

  describe('with a V3 site key', () => {
    beforeEach(() => {
      callback = jest.fn();
      providerContext = {
        siteKeyV2: undefined,
        siteKeyV3: 'test',
        loaded: false
      };
    });

    describe('and required props', () => {
      beforeEach(() => {
        rr = render(
          <ReCaptchaV3
            action="test-action"
            callback={callback}
            providerContext={providerContext}
          />
        );
        node = rr.container.firstChild;
      });

      it('renders nothing', () => {
        expect(node).toBeFalsy();
      });

      describe('when providerContext.loaded changes to true', () => {
        beforeEach(() => {
          // make sure the mocked callback hasn't been called before
          callback.mockClear();
          // mock the google reCaptcha object
          global.grecaptcha = {
            render: jest.fn(),
            reset: jest.fn(),
            getResponse: jest.fn(),
            // execute: jest.fn((widgetId?: number, options?: options): void => { return; })
            execute: jest
              .fn()
              .mockImplementation(
                (siteKey: string, options?: options): Promise<string> =>
                  Promise.resolve('test-token')
              )
          };
          // change loaded to true
          providerContext = {
            ...providerContext,
            loaded: true
          };
          rr.rerender(
            <ReCaptchaV3
              action="test-action"
              callback={callback}
              providerContext={providerContext}
            />
          );
        });

        it('invokes the google reCaptcha execute once', () => {
          expect(global.grecaptcha.execute).toHaveBeenCalledTimes(1);
        });

        it('invokes the callback twice', () => {
          expect(callback).toHaveBeenCalledTimes(2);
        });

        it('invokes the callback without any arguments', () => {
          expect(callback).toHaveBeenNthCalledWith(1);
        });

        it('invokes the callback with the token', () => {
          expect(callback).toHaveBeenNthCalledWith(2, 'test-token');
        });
      });
    });
  });
});
