/// <reference types="q" />
import 'whatwg-fetch';
import { Promise } from 'q';
export declare const http: {
    get: (url: any) => Promise<any>;
    post: (url: any, data?: any) => Promise<any>;
};
