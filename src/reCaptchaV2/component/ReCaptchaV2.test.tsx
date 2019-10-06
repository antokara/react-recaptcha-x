import { render, RenderResult, waitForElement } from '@testing-library/react';
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
            theme: ETheme.Light,
            tabindex: 0,
            size: ESize.Normal,
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
      rr = render(
        <ReCaptchaV2
          callback={callback}
          theme={ETheme.Light}
          tabindex={0}
          size={ESize.Normal}
          providerContext={providerContext}
        />
      );
    });

    it('matches the snapshot', () => {
      expect(rr.container.firstChild).toMatchSnapshot();
    });
  });
});
