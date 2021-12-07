import { Field, ObjectType } from "@nestjs/graphql";
import { RespostaQueryArray } from "../resposta.entity";
import { RespostaListagem } from "./generic-list";

@ObjectType()  //o que for retorno é objeto
export class Documento {

    @Field({ nullable: true })
    nm_Documento: string

    @Field({ nullable: true })
    nm_Arquivo: string

    @Field({ nullable: true })
    dt_Documento: string

    @Field({nullable: true })
    nr_Revisao: number

    @Field({nullable: true })
    cd_Documento: number

    @Field({nullable: true })
    cd_Processo: number

    @Field({nullable: true })
    nm_Processo: string

    @Field({nullable: true })
    cd_Filial: number

    @Field({nullable: true })
    nr_Grupo: number

    @Field({nullable: true })
    cd_Setor: number

    @Field({nullable: true})
    cd_Qualidade: string
}

@ObjectType()
export class RespostaDocumentos extends RespostaListagem(Documento) {

}
