import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { IContext } from 'src/provider/IContext';
import { ReCaptchaV3 } from './ReCaptchaV3';
import { TCallback } from './TCallback';

describe('ReCaptchaV3 component', () => {
  let callback: TCallback;
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
    });
  });
});
