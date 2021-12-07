import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { PaginatedSearchParam } from "../general/paginated.model";
import { RespostaQueryArray } from "../resposta.entity";

@InputType()
export class GruposceqParams extends PaginatedSearchParam {
  
}

