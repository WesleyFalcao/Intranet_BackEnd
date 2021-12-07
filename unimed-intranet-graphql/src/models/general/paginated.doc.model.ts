import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { RespostaQueryArray } from "../resposta.entity";
import { PaginatedSearchParam } from "./paginated.model";


@InputType()
export class DocumentosCEQSearchParam extends PaginatedSearchParam {

    
}

