import { act, getByTestId, render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { ReCaptchaProvider } from 'src/provider/ReCaptchaProvider';
import { withContext } from 'src/provider/withContext';
import { clearDOM } from './helpers/clearDOM';
import { DummyComponent } from './helpers/DummyComponent';
import { EProps } from './helpers/EProps';
import { IProps } from './helpers/IProps';

describe('ReCaptchaProvider', (): void => {
  let rr: RenderResult;
  let DummyComponentWithContext: React.ComponentType<IProps>;
  let node: ChildNode | null;

  describe('first mount with required props and post onload invocation', (): void => {
    beforeAll((): void => {
      clearDOM();
      // reset state
      delete window?.GoogleReCaptcha_onload;
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
    });

    it('onload handler is defined', (): void => {
      expect(window.GoogleReCaptcha_onload).toBeInstanceOf(Function);
    });

    describe('unmount and invoke onload handler', (): void => {
      beforeEach(async (): Promise<void> => {
        rr.unmount();
        // emulate the onload call by the google api
        await act(async () => {
          if (typeof window.GoogleReCaptcha_onload === 'function') {
            window.GoogleReCaptcha_onload();
          }
        });
      });

      it('onload handler is undefined', (): void => {
        expect(window.GoogleReCaptcha_onload).toBeUndefined();
      });
    });

    describe('second mount with optional props', (): void => {
      beforeEach(async (): Promise<void> => {
        // wrap our dummy component with the context and get its props
        DummyComponentWithContext = withContext(DummyComponent);
        // new render to trigger a new mount with all optional props
        await act(async () => {
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
        });
        node = getByTestId(rr.container, 'dummy-test-id');
      });

      it('script tag gets injected only once', (): void => {
        expect(document.querySelectorAll('script')).toHaveLength(1);
      });

      it('style tag gets injected only once', (): void => {
        expect(document.querySelectorAll('style')).toHaveLength(1);
      });

      it('changes the component`s loaded prop to true', (): void => {
        expect(node).toHaveAttribute('data-loaded', 'true');
      });

      it('the onload handler gets deleted', (): void => {
        expect(window.GoogleReCaptcha_onload).toBeUndefined();
      });
    });
  });

  describe('first mount with required props', (): void => {
    beforeEach(async (): Promise<void> => {
      clearDOM();
      // reset state
      delete window?.GoogleReCaptcha_onload;
      // wrap our dummy component with the context and get its props
      DummyComponentWithContext = withContext(DummyComponent);
      // render our dummy component in a two level nested node
      // under the provider, to test the context passing down
      await act(async () => {
        rr = render(
          <ReCaptchaProvider>
            <div>
              <DummyComponentWithContext dummy="dummy-prop" otherDummy={55} />
            </div>
          </ReCaptchaProvider>
        );
      });
    });

    it('onload handler is defined', (): void => {
      expect(window.GoogleReCaptcha_onload).toBeInstanceOf(Function);
    });

    describe('second mount with optional props and post onload invocation', (): void => {
      beforeEach(async (): Promise<void> => {
        // wrap our dummy component with the context and get its props
        DummyComponentWithContext = withContext(DummyComponent);
        // new render to trigger a new mount with all optional props

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
        await act(async () => {
          // emulate the onload call by the google api
          if (typeof window.GoogleReCaptcha_onload === 'function') {
            window.GoogleReCaptcha_onload();
          }
        });
        node = getByTestId(rr.container, 'dummy-test-id');
      });

      it('script tag gets injected only once', (): void => {
        expect(document.querySelectorAll('script')).toHaveLength(1);
      });

      it('style tag gets injected only once', (): void => {
        expect(document.querySelectorAll('style')).toHaveLength(1);
      });

      it('changes the component`s loaded prop to true', (): void => {
        expect(node).toHaveAttribute('data-loaded', 'true');
      });

      it('the onload handler gets deleted', (): void => {
        expect(window.GoogleReCaptcha_onload).toBeUndefined();
      });
    });
  });

  describe('first mount with required props and onload invocation', (): void => {
    beforeEach(async (): Promise<void> => {
      // make sure everything is clear for this scope
      clearDOM();
      // reset state: investigate how to uncomment this with TS v4+
      // delete window.GoogleReCaptcha_onload;
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
      await act(async () => {
        // emulate the onload call by the google api
        // const { googleReCaptcha_onload } = window;
        if (typeof window.GoogleReCaptcha_onload === 'function') {
          window.GoogleReCaptcha_onload();
        }
      });
    });

    it('onload handler is not defined', (): void => {
      expect(window.GoogleReCaptcha_onload).toBeUndefined();
    });

    describe('second mount with optional props', (): void => {
      beforeEach(async (): Promise<void> => {
        // wrap our dummy component with the context and get its props
        DummyComponentWithContext = withContext(DummyComponent);
        // new render to trigger a new mount with all optional props
        await act(async () => {
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
        });
        node = getByTestId(rr.container, 'dummy-test-id');
      });

      it('script tag gets injected only once', (): void => {
        expect(document.querySelectorAll('script')).toHaveLength(1);
      });

      it('style tag gets injected only once', (): void => {
        expect(document.querySelectorAll('style')).toHaveLength(1);
      });

      it('changes the component`s loaded prop to true', (): void => {
        expect(node).toHaveAttribute('data-loaded', 'true');
      });

      it('the onload handler gets deleted', (): void => {
        expect(window.GoogleReCaptcha_onload).toBeUndefined();
      });
    });
  });
});
