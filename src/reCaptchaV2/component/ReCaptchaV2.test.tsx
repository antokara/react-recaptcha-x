import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { IContext } from 'src/provider/IContext';
import { ESize } from './ESize';
import { ETheme } from './ETheme';
import { ReCaptchaV2 } from './ReCaptchaV2';
import { TCallback } from './TCallback';

describe('ReCaptchaV2 component', () => {
  let renderer: TestRenderer.ReactTestRenderer;
  let callback: TCallback;
  let providerContext: IContext;

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
      expect(() =>
        TestRenderer.create(
          <ReCaptchaV2
            callback={callback}
            theme={ETheme.Light}
            tabindex={0}
            size={ESize.Normal}
            providerContext={providerContext}
          />
        )
      ).toThrowError(
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

      renderer = TestRenderer.create(
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
      expect(renderer.toJSON()).toMatchSnapshot();
    });
  });
});
