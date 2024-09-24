export class SubTestDto {
    field: string;
    number: number;
}

export class TestDto {
    optionalField?: string;
    optionalField2: string | undefined;
    field: string;
    number: number;
    boolean: boolean;
    array: number[];
    object: SubTestDto;
    listSub: SubTestDto[];
}
