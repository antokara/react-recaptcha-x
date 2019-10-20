import * as React from 'react';
import { IConsumer } from 'src/provider/IConsumer';
import { IProps } from './IProps';

// our dummy component
export const DummyComponent: (props: IProps & IConsumer) => JSX.Element = (
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
