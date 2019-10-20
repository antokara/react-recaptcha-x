import { getByTestId, render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { IConsumer } from './IConsumer';
import { ReCaptchaProvider } from './ReCaptchaProvider';
import { withContext } from './withContext';

// dummy prop values
const siteKeyV2: string = 'test-site-key-v2';
const siteKeyV3: string = 'test-site-key-v3';
const langCode: string = 'en';

// our dummy component's props
interface IProps {
  dummy: string;
  otherDummy: number;
}

// our dummy component
const DummyComponent: (props: IProps & IConsumer) => JSX.Element = (
  props: IProps & IConsumer
): JSX.Element => (
  <div
    data-testid="dummy-test-id"
    data-dummy={props.dummy}
    data-other-dummy={props.otherDummy}
    data-sitekey-v2={props.providerContext.siteKeyV2}
    data-sitekey-v3={props.providerContext.siteKeyV3}
    data-loaded={props.providerContext.loaded}
  >
    dummyComponent
  </div>
);

describe('ReCaptchaProvider', () => {
  let rr: RenderResult;
  let node: ChildNode | null;
  let DummyComponentWithContext: React.ComponentType<IProps>;

  /**
   * clears the DOM from script, style tags
   * to ensure a "clear DOM" state, between each test
   */
  beforeEach(() =>
    document
      .querySelectorAll('script,style')
      .forEach((n: Element) => n.remove())
  );

  describe('with required props', () => {
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
  });

  describe('with optional props', () => {
    beforeEach(() => {
      // wrap our dummy component with the context and get its props
      DummyComponentWithContext = withContext(DummyComponent);
      // render our dummy component in a two level nested node
      // under the provider, to test the context passing down
      rr = render(
        <ReCaptchaProvider
          siteKeyV2={siteKeyV2}
          siteKeyV3={siteKeyV3}
          langCode={langCode}
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
        expect(node).toHaveAttribute('data-sitekey-v2', siteKeyV2);
      });

      it('has the siteKeyV3', () => {
        expect(node).toHaveAttribute('data-sitekey-v3', siteKeyV3);
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
          `https://www.google.com/recaptcha/api.js?render=${siteKeyV3}&onload=GoogleReCaptcha_onload&hl=${langCode}`
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
});
