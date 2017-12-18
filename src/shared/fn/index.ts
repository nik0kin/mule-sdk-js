
import { assign } from 'lodash';

import * as httpLib from './http';
import * as muleLib from './mule';

import { HttpFnLibrary } from './http';
import { MuleFnLibrary } from './mule';


export type FnLibrary = HttpFnLibrary & MuleFnLibrary;

export const allFn: FnLibrary =  assign({}, httpLib, muleLib);
