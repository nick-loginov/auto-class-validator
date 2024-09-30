import * as ts from "typescript";
import * as fs from "node:fs";
import * as util from "node:util"

export function getAllFlags() {
    let flags = [];
    flags.push(ts.TypeFormatFlags)
    return
}

export function logInfo(...args: any[]) {
    fs.appendFileSync("logs.txt", args.map((arg) => util.inspect(arg) + "\n").join())
}   