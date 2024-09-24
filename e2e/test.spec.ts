import { plainToClass } from "@nestjs/class-transformer";
import { TestDto } from "./test.dto";
import { validate } from "@nestjs/class-validator";

describe("validate simple dto", () => {
    it("test.dto", async () => {
        const objectToValidate = {
            optionalField2: 2,
            array: 2
        };
        const testInstance = plainToClass(TestDto, objectToValidate);
        const validateResult = await validate(testInstance);

        expect(validateResult[0]).toMatchObject({
            "constraints": {
                "isString": "optionalField2 must be a string"
            }
        });
        expect(validateResult[1]).toMatchObject({
            "constraints": {
                "isString": "field must be a string"
            }
        });
        expect(validateResult[2]).toMatchObject({
            "constraints": {
                "isNumber": "number must be a number conforming to the specified constraints"
            }
        });
        expect(validateResult[3]).toMatchObject({
            "constraints": {
                "isBoolean": "boolean must be a boolean value"
            }
        });
        expect(validateResult[4]).toMatchObject({
            "constraints": {
                "isArray": "array must be an array"
            }
        });
        expect(validateResult[5]).toMatchObject({
            "constraints": {
                "isArray": "listSub must be an array"
            }
        });
    });
})
