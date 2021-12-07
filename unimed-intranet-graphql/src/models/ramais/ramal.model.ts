import { Field, ObjectType } from "@nestjs/graphql";
import { RespostaQueryArray } from "../resposta.entity";

@ObjectType()
export class Ramal {

    @Field({ nullable: true })
    nm_Pessoa: string

    @Field({ nullable: true }) 
    ds_Email: string

    @Field({ nullable: true })
    nr_Ramal: string

    @Field({ nullable: true })
    nr_Telefone: string

    @Field({ nullable: true })
    nm_Departamento: string
 
}
