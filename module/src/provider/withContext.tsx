import * as React from 'react';
import { Context } from './Context';
import { IContext } from './IContext';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type WithContext = <
  P extends { providerContext?: IContext },
  R = Omit<P, 'providerContext'>
>(
  Component: React.ComponentClass<P> | React.FunctionComponent<P>
) => React.FunctionComponent<R>;

/**
 * a HOC which passes down the Provider Context
 * as the "providerContext" prop object
 */
const withContext: WithContext = <
  P extends { providerContext?: IContext },
  R = Omit<P, 'providerContext'>
>(
  Component: React.ComponentClass<P> | React.FunctionComponent<P>
): React.FunctionComponent<R> => {
  return (props: R): React.FunctionComponent<R> => (
    <Context.Consumer>
      {value => <Component {...props} providerContext={value} />}
    </Context.Consumer>
  );
};

export { withContext };
