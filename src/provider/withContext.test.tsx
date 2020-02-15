import { getByTestId, render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { IConsumer } from './IConsumer';
import { ReCaptchaProvider } from './ReCaptchaProvider';
import { withContext } from './withContext';

// dummy prop values
const siteKeyV2: string = 'test-key-v2';
const siteKeyV3: string = 'test-key-v3';

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

describe('withContext HOC', (): void => {
  let rr: RenderResult;
  let node: ChildNode | null;
  beforeEach((): void => {
    // clear the DOM from script tags
    // to ensure a "clear DOM" state, between each test
    document
      .querySelectorAll('script')
      .forEach((n: Element): void => n.remove());
    // wrap our dummy component with the context and get its props
    const DummyComponentWithContext: React.ComponentType<IProps> = withContext(
      DummyComponent
    );
    // render our dummy component in a two level nested node
    // under the provider, to test the context passing down
    rr = render(
      <ReCaptchaProvider siteKeyV2={siteKeyV2} siteKeyV3={siteKeyV3}>
        <div>
          <DummyComponentWithContext dummy="dummy-prop" otherDummy={55} />
        </div>
      </ReCaptchaProvider>
    );
    node = getByTestId(rr.container, 'dummy-test-id');
  });

  describe('context provided props', (): void => {
    it('has the siteKeyV2', (): void => {
      expect(node).toHaveAttribute('data-sitekey-v2', siteKeyV2);
    });

    it('has the siteKeyV3', (): void => {
      expect(node).toHaveAttribute('data-sitekey-v3', siteKeyV3);
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
});
