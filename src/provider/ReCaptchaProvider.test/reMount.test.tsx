import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { ReCaptchaProvider } from 'src/provider/ReCaptchaProvider';
import { withContext } from 'src/provider/withContext';
import { clearDOM } from './helpers/clearDOM';
import { DummyComponent } from './helpers/DummyComponent';
import { EProps } from './helpers/EProps';
import { IProps } from './helpers/IProps';

describe('ReCaptchaProvider', () => {
  let rr: RenderResult;
  let DummyComponentWithContext: React.ComponentType<IProps>;

  // make sure everything is clear
  beforeAll(clearDOM);

  // check double render/mount not causing the
  // script/style getting inject twice as well
  // but without the beforeEach cleanup though
  // so that the script is already there and we double render/mount...
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
    });

    describe('second mount with optional props', () => {
      beforeEach(() => {
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
