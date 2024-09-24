import { plainToClass } from "@nestjs/class-transformer";
import { validate } from "@nestjs/class-validator";
import { readFileSync } from "fs";
import * as fs from "node:fs";
import * as path from "node:path";
import "reflect-metadata";
import * as ts from "typescript";
import { before } from "../lib/plugin/before";

describe("test before", () =>{
    it("test dto", () => {
        const options: ts.CompilerOptions = {
            experimentalDecorators: true
        };
        const filenameInput = path.join(__dirname, "fixtures", "test.dto.ts");
        // const manualFilenameInput = path.join(__dirname, "fixtures", "test.manual.dto.ts");
        const filenameTarget = path.join(__dirname, "fixtures", "test.dto.output.js");
        const filenameOutput = path.join(__dirname, "__temp", "test.dto.output.js");
        // const manualFilenameOutput = path.join(__dirname, "__temp", "test.manual.dto.output.js");

        const fileTarget = readFileSync(filenameTarget, "utf-8");

        const fakeProgram = ts.createProgram([filenameInput], options);

        const result = ts.transpileModule(readFileSync(filenameInput, "utf-8"), {
            compilerOptions: options,
            fileName: filenameInput,
            transformers: {
              before: [
                before(
                  { controllerKeyOfComment: 'summary', introspectComments: true },
                  fakeProgram
                )
              ]
            }
        });

        fs.writeFileSync(filenameOutput, result.outputText);

        expect(result.outputText).toEqual(fileTarget);
    });
    it("test generated dto", async () => {

      const generatedDto = require("./__temp/test.dto.output.js");
      const { TestDto } = generatedDto;

      const objectToValidate = {
        optionalField2: 2,
        array: 2
      };
      const testInstance = plainToClass(TestDto, objectToValidate);
      const validateResult = await validate(testInstance as any);
      console.log(validateResult);

    })
})
