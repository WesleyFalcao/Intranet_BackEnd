import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { RespostaQueryArray } from "../resposta.entity";


@InputType()
export class PaginatedSearchParam {

    @Field({ nullable: true })
    nm_Search: string

    @Field({ nullable: true }) 
    nr_Page_Length: number

    @Field({ nullable: true }) 
    nr_Page: number
    
    @Field({ nullable: true})
    nm_Inicial_Selecionada: string
}

