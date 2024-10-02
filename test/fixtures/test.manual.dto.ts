import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";

export class SubTestDto {
    @IsString()
    field: string;

    @IsNumber()
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

    @IsArray()
    @IsNumber()
    array: number[];
    object: SubTestDto;
    @IsArray()
    listSub: SubTestDto[];
}
