import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { RespostaQueryArray } from "../resposta.entity";


@InputType()
export class RamalParams {

    @Field({ nullable: true })
    nm_Search: string

    @Field({ nullable: true }) 
    pageLength: number

    @Field({ nullable: true }) 
    page: number

    @Field({ nullable: true }) 
    cd_Origem?: number
    
}

