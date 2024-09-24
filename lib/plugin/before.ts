import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, ValidationOptions } from "@nestjs/class-validator";
import * as ts from "typescript";

const CLASS_VALIDATOR_NAMESPACE = "class_validator";
const CLASS_VALIDATOR_PACKAGE = "@nestjs/class-validator";

function isFilenameMatched(suffixes: string[], filename: string) {
    return suffixes.some(suffix => filename.includes(suffix));
}

export function hasFlag(type: ts.Type, flag: ts.TypeFlags) {
    return (type.flags & flag) === flag;
}

export function isString(type: ts.Type) {
    return hasFlag(type, ts.TypeFlags.String) || hasFlag(type, ts.TypeFlags.StringLiteral) || hasFlag(type, ts.TypeFlags.StringMapping);
}

export function isNumber(type: ts.Type) {
    return hasFlag(type, ts.TypeFlags.Number);
}

export function isBoolean(type: ts.Type) {
    return hasFlag(type, ts.TypeFlags.Boolean);
}

export const before = (options?: Record<string, any>, program?: ts.Program) => {
    return (ctx: ts.TransformationContext): ts.Transformer<any> => {
        return (sf: ts.SourceFile) => {
            if (!isFilenameMatched([".dto"], sf.fileName)) {
                return sf;
            }
            const updateImports = (
                sf: ts.SourceFile,
                factory: ts.NodeFactory,
                program: ts.Program
            ) => {
                const importEqualsDeclaration: ts.ImportEqualsDeclaration =
                    factory.createImportEqualsDeclaration(
                        undefined,
                        false,
                        factory.createIdentifier(CLASS_VALIDATOR_NAMESPACE),
                        factory.createExternalModuleReference(
                            factory.createStringLiteral(CLASS_VALIDATOR_PACKAGE)
                        )
                    )

                return factory.updateSourceFile(sf, [
                    importEqualsDeclaration,
                    ...sf.statements
                ])
            }

            const addStringDecoratorToNode = (
                factory: ts.NodeFactory,
                node: ts.PropertyDeclaration,
                typeChecker: ts.TypeChecker
            ) => {
                const modifiers = ts.getModifiers(node) ?? [];
                let type = typeChecker.getTypeAtLocation(node);
                const typeNode = node.type;

                if (typeNode && ts.isFunctionTypeNode(typeNode)) {
                    console.log(typeNode.getText(), " is constructor type node")
                }

                let isOptional = !!node.questionToken;
                let isArray = false;

                if (typeNode && ts.isUnionTypeNode(typeNode)) {
                    const undefinedSubtypeIndex = typeNode.types.findIndex((subNodeType) => {
                        const subType = typeChecker.getTypeFromTypeNode(subNodeType);
                        return subType.flags & ts.TypeFlags.Undefined
                    });
                    if (typeNode.types.length == 2 && undefinedSubtypeIndex !== -1) {
                        isOptional = true;
                        type = typeChecker.getTypeAtLocation(typeNode.types[1 - undefinedSubtypeIndex]);
                    }
                }

                if (typeNode && ts.isArrayTypeNode(typeNode)) {
                    isArray = true;
                    type = typeChecker.getTypeAtLocation(typeNode.elementType);
                }

                let checkType: ts.Type | undefined = type;

                const updatedDecorators = [];
                if (checkType) {
                    const propertyAssignments = [];
                    if (isArray) {
                        propertyAssignments.push(factory.createPropertyAssignment("each", factory.createTrue()))
                    }
                    const commonOpts = [factory.createObjectLiteralExpression(propertyAssignments)];
                    if (isString(type)){
                        updatedDecorators.push(
                            factory.createDecorator(
                                factory.createCallExpression(
                                    factory.createIdentifier(`${CLASS_VALIDATOR_NAMESPACE}.${IsString.name}`),
                                    undefined,
                                    commonOpts
                                )
                            )
                        );
                    }
                    if (isNumber(type)) {
                        updatedDecorators.push(
                            factory.createDecorator(
                                factory.createCallExpression(
                                    factory.createIdentifier(`${CLASS_VALIDATOR_NAMESPACE}.${IsNumber.name}`),
                                    undefined,
                                    commonOpts
                                )
                            )
                        );
                    }
                    if (isBoolean(type)) {
                        updatedDecorators.push(
                            factory.createDecorator(
                                factory.createCallExpression(
                                    factory.createIdentifier(`${CLASS_VALIDATOR_NAMESPACE}.${IsBoolean.name}`),
                                    undefined,
                                    commonOpts
                                )
                            )
                        );
                    }
                }

                if (isOptional) {
                    updatedDecorators.push(
                        factory.createDecorator(
                            factory.createCallExpression(
                                factory.createIdentifier(`${CLASS_VALIDATOR_NAMESPACE}.${IsOptional.name}`),
                                undefined,
                                undefined
                            )
                        )
                    )
                }

                if (isArray) {
                    updatedDecorators.push(
                        factory.createDecorator(
                            factory.createCallExpression(
                                factory.createIdentifier(`${CLASS_VALIDATOR_NAMESPACE}.${IsArray.name}`),
                                undefined,
                                undefined
                            )
                        )
                    )
                }

                return factory.updatePropertyDeclaration(
                    node,
                    [...updatedDecorators, ...modifiers],
                    node.name,
                    node.questionToken,
                    node.type,
                    node.initializer
                )
            }

            const visitPropertyNode = (node: ts.Node): ts.Node => {
                if (ts.isPropertyDeclaration(node)) {
                    return addStringDecoratorToNode(ctx.factory, node, program!.getTypeChecker());
                }
                return node;
            };
            const visitClassNode = (node: ts.Node): ts.Node => {
                if (ts.isClassDeclaration(node)) {
                    return ts.visitEachChild(node, visitPropertyNode, ctx);
                }
                return ts.visitEachChild(node, visitClassNode, ctx);
            };
            sf = updateImports(sf, ctx.factory, program!);

            return ts.visitNode(sf, visitClassNode);
        }
    }
}

export default before;
