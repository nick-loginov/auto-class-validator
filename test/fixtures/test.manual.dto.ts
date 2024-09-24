import { IsBoolean, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";

export class SubTestDto {
    field: string;
    number: number;
}

export class TestDto {
    @IsBoolean()
    @IsOptional()
    optionalField?: boolean;

    @IsString()
    @IsOptional()
    optionalField2: string | undefined;

    @IsString()
    field: string;

    @IsNumber()
    number: number;

    @IsBoolean()
    boolean: boolean;

    array: number[];
    object: SubTestDto;
    listSub: SubTestDto[];
}
