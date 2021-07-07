/* eslint-disable @typescript-eslint/ban-types */
import * as React from 'react';
import { Context } from './Context';
import { IContext } from './IContext';

/**
 * context consumer HOC type
 *
 * a function that takes in the component and
 * returns the same component but with the context passed as a prop
 */
type TWithContext = <T extends object>(
  Component: React.ComponentType<T>
) => React.ComponentType<T>;

/**
 * consumer child type
 *
 * a function that is invoked with the context value and
 * returns the consumer component
 */
type TConsumerChild = (value: IContext) => React.ReactElement;

/**
 * context consumer child generator type
 *
 * takes the component with its props and
 * returns a function that creates the consumer child component
 */
type TConsumerChildGenerator = <T extends object>(
  Component: React.ComponentType<T>,
  props: T
) => TConsumerChild;

/**
 * context consumer child generator
 *
 * - gets the component to wrap and the props of the HOC.
 * - returns a function that accepts the Context value
 * - finally, returns the Component with both
 *  - ownProps of the Component
 *  - providerContext prop
 */
const ConsumerChildGenerator: TConsumerChildGenerator =
  <T extends object>(
    Component: React.ComponentType<T>,
    props: T
  ): TConsumerChild =>
  (value: IContext): React.ReactElement =>
    <Component {...props} providerContext={value} />;

/**
 * context consumer HOC
 *
 * a function that takes in the component and
 * returns the same component but with the context passed as a prop
 */
const withContext: TWithContext = <T extends object>(
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
