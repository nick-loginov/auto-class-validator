import { before } from './plugin/before';
import type { TsCompilerInstance } from 'ts-jest/dist/types'

export interface MyPluginOptions {
    some?: string
}

export const version = "1.0.0";
export const name="validation";

export function factory(compilerInstance: TsCompilerInstance){
    return before;
};
