import { Field, ObjectType } from "@nestjs/graphql";
import { PaginatedSearchParam } from "../general/paginated.model";
import { RespostaQueryArray } from "../resposta.entity";

@ObjectType()
export class Gruposceq{

    @Field({nullable: true})
    cd_Grupo_Pai: number

    @Field({nullable: true})
    cd_Grupo_CEQ: number

    @Field({nullable: true})
    nm_Grupo_CEQ: string
    
    @Field({nullable: true})
    cd_Setor_CEQ: number

    @Field({nullable: true})
    nm_Setor_CEQ: string
    
}

