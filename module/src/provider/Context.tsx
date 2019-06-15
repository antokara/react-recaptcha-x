import * as React from 'react';
import { IContext } from './IContext';

/**
 * create the Provider's context
 * with default values
 */
const Context: React.Context<IContext> = React.createContext<IContext>({
  siteKeyV3: '',
  loaded: false
});

export { Context };
