# WORK IN PROGRESS (UNSTABLE)
### Automatic validation NestJS class-validator

Installation:
----
```
npm install auto-class-validator
```

## Usage
Set up plugin inside nest-cli.json:
```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "plugins": [ "auto-class-validator"]
  }
}
```
From this point for any .dto file additional class-validator metadata will be generated:

`test.dto`
```ts
class TestDto {
    fieldStr: string;
    fieldBool: boolean;
    ...
}
```
For each field of the class inside .dto file as in example above, class-validator decorators would be automatically applied.

## Support
1) Primitives (number, boolean, string)
2) Arrays of primitives
3) Optional fields
