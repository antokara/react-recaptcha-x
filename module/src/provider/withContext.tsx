import * as React from 'react';
import { Context } from './Context';
import { IContext } from './IContext';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withContext<
  P extends { providerContext?: IContext },
  R = Omit<P, 'providerContext'>
>(
  Component: React.ComponentClass<P> | React.FunctionComponent<P>
): React.FunctionComponent<R> {
  return (props: R): React.FunctionComponent<R> => {
    return (
      <Context.Consumer>
        {value => <Component {...props} providerContext={value} />}
      </Context.Consumer>
    );
  };
}
