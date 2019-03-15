import * as React from 'react';
import { IContext } from './IContext';

/**
 * the Provider's context
 */
const Context: React.Context<IContext> = React.createContext<IContext | null>(
  undefined
);

export { Context };
