import * as React from 'react';
import { Context } from './Context';
import { IConsumer } from './IConsumer';
import { IContext } from './IContext';

// our HOC
type TWithContext = <P extends IConsumer>(
  Component: React.ComponentType<P>
) => React.ComponentType<P>;

type TConsumerChild = (value: IContext) => React.ReactElement;

type TConsumerChildGenerator = <P extends IConsumer>(
  Component: React.ComponentType<P>,
  props: P
) => TConsumerChild;

/**
 * - gets the component to wrap and the props of the HOC.
 * - returns a function that accepts the Context value
 * - finally, returns the Component with both
 *  - ownProps of the Component
 *  - providerContext prop
 */
const ConsumerChildGenerator: TConsumerChildGenerator = <P extends IConsumer>(
  Component: React.ComponentType<P>,
  props: P
): TConsumerChild => (value: IContext): React.ReactElement => (
  <Component {...props} providerContext={value} />
);

/**
 * wraps and injects the context to the component provided
 */
const withContext: TWithContext = <P extends IConsumer>(
  Component: React.ComponentType<P>
): React.ComponentType<P> =>
  class WithContext extends React.Component<P> {
    public render(): React.ReactNode {
      return (
        <Context.Consumer>
          {ConsumerChildGenerator(Component, this.props)}
        </Context.Consumer>
      );
    }
  };

export { withContext };
