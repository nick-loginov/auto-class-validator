import * as ts from "typescript";
import before from "./before";

export default function (program?: ts.Program, options?: Record<string, any>) {
    return before(options, program);
}
