import * as React from 'react';
import { Context } from './Context';
import { IConsumer } from './IConsumer';
import { IContext } from './IContext';

// our HOC
type TWithContext = <T extends IConsumer>(
  Component: React.ComponentType<T>
) => React.ComponentType<T>;

type TConsumerChild = (value: IContext) => React.ReactElement;

type TConsumerChildGenerator = <T extends IConsumer>(
  Component: React.ComponentType<T>,
  props: T
) => TConsumerChild;

/**
 * - gets the component to wrap and the props of the HOC.
 * - returns a function that accepts the Context value
 * - finally, returns the Component with both
 *  - ownProps of the Component
 *  - providerContext prop
 */
const ConsumerChildGenerator: TConsumerChildGenerator = <T extends IConsumer>(
  Component: React.ComponentType<T>,
  props: T
): TConsumerChild => (value: IContext): React.ReactElement => (
  <Component {...props} providerContext={value} />
);

/**
 * wraps and injects the context to the component provided
 */
const withContext: TWithContext = <T extends IConsumer>(
  Component: React.ComponentType<T>
): React.ComponentType<T> =>
  class WithContext extends React.Component<T> {
    public render(): React.ReactNode {
      return (
        <Context.Consumer>
          {ConsumerChildGenerator(Component, this.props)}
        </Context.Consumer>
      );
    }
  };

export { withContext };
