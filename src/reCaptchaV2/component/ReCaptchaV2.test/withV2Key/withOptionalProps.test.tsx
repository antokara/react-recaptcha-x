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

  describe('with a V2 site key', (): void => {
    beforeEach((): void => {
      callback = jest.fn();
      providerContext = {
        siteKeyV2: 'test',
        siteKeyV3: undefined,
        loaded: false
      };
    });

    describe('and optional props', (): void => {
      beforeEach((): void => {
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

      it('renders the div element', (): void => {
        expect(node).toMatchInlineSnapshot(`
          <div
            class="test-class-name"
            data-test-id="data-test-id"
            id="test-id"
          />
        `);
      });

      it('it has the class attribute', (): void => {
        expect(node).toHaveClass('test-class-name');
      });

      it('it has the data-test-id attribute', (): void => {
        expect(node).toHaveAttribute('data-test-id', 'data-test-id');
      });

      it('it has the id attribute', (): void => {
        expect(node).toHaveAttribute('id', 'test-id');
      });
    });
  });
});
