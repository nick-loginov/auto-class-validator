
export class SubTestDto {
    field: string;
    number: number;
}

export class TestDto {
    optionalField?: boolean;
    optionalField2: string | undefined;
    field: string;
    number: number;
    boolean: boolean;
    array: number[];
    object: SubTestDto;
    listSub: SubTestDto[];
}
