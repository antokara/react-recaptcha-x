import { getByTestId, render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { IConsumer } from './IConsumer';
import { ReCaptchaProvider } from './ReCaptchaProvider';
import { clearDOM } from './ReCaptchaProvider.test/clearDOM';
import { DummyComponent } from './ReCaptchaProvider.test/DummyComponent';
import { EProps } from './ReCaptchaProvider.test/EProps';
import { IProps } from './ReCaptchaProvider.test/IProps';
import { withContext } from './withContext';

describe('ReCaptchaProvider', () => {
  let rr: RenderResult;
  let node: ChildNode | null;
  let DummyComponentWithContext: React.ComponentType<IProps>;

  describe('with required props', () => {
    beforeEach(() => {
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

    describe('context provided props', () => {
      it('does not have the siteKeyV2', () => {
        expect(node).not.toHaveAttribute('data-sitekey-v2');
      });

      it('does not have the siteKeyV3', () => {
        expect(node).not.toHaveAttribute('data-sitekey-v3');
      });

      it('has the loaded', () => {
        expect(node).toHaveAttribute('data-loaded', 'false');
      });
    });

    describe('own props', () => {
      it('has the dummy prop', () => {
        expect(node).toHaveAttribute('data-dummy', 'dummy-prop');
      });

      it('has the otherDummy prop', () => {
        expect(node).toHaveAttribute('data-other-dummy', '55');
      });
    });

    describe('Google reCAPTCHA JS API script tag', () => {
      let scriptTagNode: ChildNode | null;
      beforeEach(() => {
        scriptTagNode = document.querySelector('script');
      });

      it('gets injected', () => {
        expect(scriptTagNode).not.toBeNull();
      });

      it('gets injected only once', () => {
        expect(document.querySelectorAll('script')).toHaveLength(1);
      });

      it('has the correct src attribute', () => {
        expect(scriptTagNode).toHaveAttribute(
          'src',
          `https://www.google.com/recaptcha/api.js?render=explicit&onload=GoogleReCaptcha_onload&hl=`
        );
      });

      it('has the async attribute set to true', () => {
        expect(scriptTagNode).toHaveAttribute('async', 'true');
      });

      it('has the defer attribute set to true', () => {
        expect(scriptTagNode).toHaveAttribute('defer', 'true');
      });
    });

    describe('style tag for the Google reCAPTCHA V3 badge', () => {
      let scriptTagNode: ChildNode | null;
      beforeEach(() => {
        scriptTagNode = document.querySelector('style');
      });

      it('does not get injected', () => {
        expect(scriptTagNode).toBeNull();
      });
    });

    describe('window.GoogleReCaptcha_onload callback', () => {
      beforeEach(() => {
        window.GoogleReCaptcha_onload();
      });

      it('the loaded prop changes to true', () => {
        expect(node).toHaveAttribute('data-loaded', 'true');
      });
    });
  });

  describe('with optional props', () => {
    beforeEach(() => {
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

    describe('context provided props', () => {
      it('has the siteKeyV2', () => {
        expect(node).toHaveAttribute('data-sitekey-v2', EProps.siteKeyV2);
      });

      it('has the siteKeyV3', () => {
        expect(node).toHaveAttribute('data-sitekey-v3', EProps.siteKeyV3);
      });

      it('has the loaded', () => {
        expect(node).toHaveAttribute('data-loaded', 'false');
      });
    });

    describe('own props', () => {
      it('has the dummy prop', () => {
        expect(node).toHaveAttribute('data-dummy', 'dummy-prop');
      });

      it('has the otherDummy prop', () => {
        expect(node).toHaveAttribute('data-other-dummy', '55');
      });
    });

    describe('Google reCAPTCHA JS API script tag', () => {
      let scriptTagNode: ChildNode | null;
      beforeEach(() => {
        scriptTagNode = document.querySelector('script');
      });

      it('gets injected', () => {
        expect(scriptTagNode).not.toBeNull();
      });

      it('gets injected only once', () => {
        expect(document.querySelectorAll('script')).toHaveLength(1);
      });

      it('has the correct src attribute', () => {
        expect(scriptTagNode).toHaveAttribute(
          'src',
          `https://www.google.com/recaptcha/api.js?render=${EProps.siteKeyV3}&onload=GoogleReCaptcha_onload&hl=${EProps.langCode}`
        );
      });

      it('has the async attribute set to true', () => {
        expect(scriptTagNode).toHaveAttribute('async', 'true');
      });

      it('has the defer attribute set to true', () => {
        expect(scriptTagNode).toHaveAttribute('defer', 'true');
      });
    });

    describe('style tag for the Google reCAPTCHA V3 badge', () => {
      let styleTagNode: ChildNode | null;
      beforeEach(() => {
        styleTagNode = document.querySelector('style');
      });

      it('gets injected', () => {
        expect(styleTagNode).not.toBeNull();
      });

      it('gets injected only once', () => {
        expect(document.querySelectorAll('style')).toHaveLength(1);
      });
    });
  });

  // check re-mount script/style inject being only one
  // but disable the beforeEach cleanup though
  // so that the script is already there and we re-render/re-mount...
  describe('first mount with required props', () => {
    beforeEach(() => {
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

    describe('second mount with optional props', () => {
      beforeEach(() => {
        // wrap our dummy component with the context and get its props
        DummyComponentWithContext = withContext(DummyComponent);
        // re-render/re-mount with all optional props
        rr.rerender(
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
      });

      it('script tag gets injected only once', () => {
        expect(document.querySelectorAll('script')).toHaveLength(1);
      });

      it('style tag gets injected only once', () => {
        expect(document.querySelectorAll('style')).toHaveLength(1);
      });
    });
  });
});
