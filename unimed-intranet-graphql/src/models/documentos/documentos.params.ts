import { Field, InputType } from "@nestjs/graphql";
import { PaginatedSearchParam } from "../general/paginated.model";

@InputType() //o que for parametro é input
export class DocumentosParams extends PaginatedSearchParam
{
    @Field({nullable : true})
    nm_Search: string

}