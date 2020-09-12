import { getByTestId, render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { ReCaptchaProvider } from 'src/provider/ReCaptchaProvider';
import { withContext } from 'src/provider/withContext';
import { clearDOM } from './helpers/clearDOM';
import { DummyComponent } from './helpers/DummyComponent';
import { IProps } from './helpers/IProps';

describe('ReCaptchaProvider', (): void => {
  let rr: RenderResult;
  let node: ChildNode | null;
  let DummyComponentWithContext: React.ComponentType<IProps>;

  describe('with required props', (): void => {
    beforeEach((): void => {
      // make sure we clean DOM from script/style tags
      clearDOM();
      // wrap our dummy component with the context and get its props
      DummyComponentWithContext = withContext(DummyComponent);
      // render our dummy component in a two level nested node
      // under the provider, to test the context passing down
      rr = render(
        <ReCaptchaProvider>
          <div>
            <DummyComponentWithContext dummy="dummy-prop" otherDummy={55} />
          </div>
        </ReCaptchaProvider>
      );
      node = getByTestId(rr.container, 'dummy-test-id');
    });

    describe('context provided props', (): void => {
      it('does not have the siteKeyV2', (): void => {
        expect(node).not.toHaveAttribute('data-sitekey-v2');
      });

      it('does not have the siteKeyV3', (): void => {
        expect(node).not.toHaveAttribute('data-sitekey-v3');
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
          `https://www.google.com/recaptcha/api.js?render=explicit&onload=GoogleReCaptcha_onload&hl=`
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
      let scriptTagNode: ChildNode | null;
      beforeEach((): void => {
        scriptTagNode = document.querySelector('style');
      });

      it('does not get injected', (): void => {
        expect(scriptTagNode).toBeNull();
      });
    });

    describe('window.GoogleReCaptcha_onload callback', (): void => {
      beforeEach((): void => {
        if (window.GoogleReCaptcha_onload) {
          window.GoogleReCaptcha_onload();
        }
      });

      it('the loaded prop changes to true', (): void => {
        expect(node).toHaveAttribute('data-loaded', 'true');
      });

      it('the onload handler gets deleted', (): void => {
        expect(window.GoogleReCaptcha_onload).toBeUndefined();
      });
    });
  });
});
