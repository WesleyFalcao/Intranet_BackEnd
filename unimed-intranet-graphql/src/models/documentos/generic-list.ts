import { Type } from "@nestjs/common";
import { Field, Int, ObjectType } from "@nestjs/graphql";

export function RespostaListagem<T>(classRef: Type<T>): any {

    @ObjectType({ isAbstract: true })
    abstract class ListagemGenerica {
        
        @Field(type => [classRef], { nullable: true })
        data: T;

        @Field(type => Int, { nullable: true })
        nr_Registros: number   
    }

    return ListagemGenerica;
}


