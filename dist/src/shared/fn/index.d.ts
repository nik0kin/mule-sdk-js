import { HttpFnLibrary } from './http';
import { MuleFnLibrary } from './mule';
export declare type FnLibrary = HttpFnLibrary & MuleFnLibrary;
export declare const allFn: FnLibrary;
