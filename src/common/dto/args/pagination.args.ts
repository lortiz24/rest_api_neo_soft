import { IsOptional, Min } from "class-validator";
import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class PaginationArgs {
    @IsOptional()
    @Min(1)
    @Field(() => Int, { nullable: true })
    limit: number = 10;

    @IsOptional()
    @Min(1)
    @Field(() => Int, { nullable: true })
    offset: number = 0;
}