import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class TokenArquivo{
    
    @Field({nullable: true})
    ds_Token: string
    
}
