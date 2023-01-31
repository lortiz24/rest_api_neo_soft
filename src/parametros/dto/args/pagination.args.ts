import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PaginationArgs {
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    @Field(() => Number, { nullable: true })
    limit?: number;

    @IsOptional()
    @Min(0)
    @Type(() => Number)
    @Field(() => Number, { nullable: true })
    offset?: number;
}