import { getByTestId, render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { ReCaptchaProvider } from 'src/provider/ReCaptchaProvider';
import { withContext } from 'src/provider/withContext';
import { clearDOM } from './helpers/clearDOM';
import { DummyComponent } from './helpers/DummyComponent';
import { EProps } from './helpers/EProps';
import { IProps } from './helpers/IProps';

describe('ReCaptchaProvider', (): void => {
  let rr: RenderResult;
  let node: ChildNode | null;
  let DummyComponentWithContext: React.ComponentType<IProps>;

  describe('with optional props', (): void => {
    beforeEach((): void => {
      // make sure we clean DOM from script/style tags
      clearDOM();
      // wrap our dummy component with the context and get its props
      DummyComponentWithContext = withContext(DummyComponent);
      // render our dummy component in a two level nested node
      // under the provider, to test the context passing down
      rr = render(
        <ReCaptchaProvider
          siteKeyV2={EProps.siteKeyV2}
          siteKeyV3={EProps.siteKeyV3}
          langCode={EProps.langCode}
          hideV3Badge={true}
        >
          <div>
            <DummyComponentWithContext dummy="dummy-prop" otherDummy={55} />
          </div>
        </ReCaptchaProvider>
      );
      node = getByTestId(rr.container, 'dummy-test-id');
    });

    describe('context provided props', (): void => {
      it('has the siteKeyV2', (): void => {
        expect(node).toHaveAttribute('data-sitekey-v2', EProps.siteKeyV2);
      });

      it('has the siteKeyV3', (): void => {
        expect(node).toHaveAttribute('data-sitekey-v3', EProps.siteKeyV3);
      });

      it('has the loaded', (): void => {
        expect(node).toHaveAttribute('data-loaded', 'false');
      });
    });

    describe('own props', (): void => {
      it('has the dummy prop', (): void => {
        expect(node).toHaveAttribute('data-dummy', 'dummy-prop');
      });

      it('has the otherDummy prop', (): void => {
        expect(node).toHaveAttribute('data-other-dummy', '55');
      });
    });

    describe('Google reCAPTCHA JS API script tag', (): void => {
      let scriptTagNode: ChildNode | null;
      beforeEach((): void => {
        scriptTagNode = document.querySelector('script');
      });

      it('gets injected', (): void => {
        expect(scriptTagNode).not.toBeNull();
      });

      it('gets injected only once', (): void => {
        expect(document.querySelectorAll('script')).toHaveLength(1);
      });

      it('has the correct src attribute', (): void => {
        expect(scriptTagNode).toHaveAttribute(
          'src',
          `https://www.google.com/recaptcha/api.js?render=${EProps.siteKeyV3}&onload=GoogleReCaptcha_onload&hl=${EProps.langCode}`
        );
      });

      it('has the async attribute set to true', (): void => {
        expect(scriptTagNode).toHaveAttribute('async', 'true');
      });

      it('has the defer attribute set to true', (): void => {
        expect(scriptTagNode).toHaveAttribute('defer', 'true');
      });
    });

    describe('style tag for the Google reCAPTCHA V3 badge', (): void => {
      let styleTagNode: ChildNode | null;
      beforeEach((): void => {
        styleTagNode = document.querySelector('style');
      });

      it('gets injected', (): void => {
        expect(styleTagNode).not.toBeNull();
      });

      it('gets injected only once', (): void => {
        expect(document.querySelectorAll('style')).toHaveLength(1);
      });
    });
  });
});
