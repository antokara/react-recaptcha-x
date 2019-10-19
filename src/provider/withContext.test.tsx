import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { IConsumer } from './IConsumer';
import { ReCaptchaProvider } from './ReCaptchaProvider';
import { withContext } from './withContext';

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

describe('withContext HOC', () => {
  let rr: RenderResult;
  let node: ChildNode | null;
  beforeEach(async () => {
    // wrap our dummy component with the context and get its props
    const DummyComponentWithContext: React.ComponentType<IProps> = withContext(
      DummyComponent
    );
    // render our dummy component in a two level nested node
    // under the provider, to test the context passing down
    rr = render(
      <ReCaptchaProvider siteKeyV2="test-key-v2" siteKeyV3="test-key-v3">
        <div>
          <DummyComponentWithContext dummy="dummy-prop" otherDummy={55} />
        </div>
      </ReCaptchaProvider>
    );
    node = await rr.findByTestId('dummy-test-id');
  });

  describe('context provided props', () => {
    it('has the siteKeyV2', () => {
      expect(node).toHaveAttribute('data-sitekey-v2', 'test-key-v2');
    });

    it('has the siteKeyV3', () => {
      expect(node).toHaveAttribute('data-sitekey-v3', 'test-key-v3');
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
});
