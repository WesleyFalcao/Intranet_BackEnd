import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { Token } from "src/decorators/token.decorator";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { Documento, RespostaDocumentos } from "src/models/documentos/documento.model";
import { DocumentosParams } from "src/models/documentos/documentos.params";
import { TokenArquivo } from "src/models/documentos/token-arquivo.model";
import { Fila, RespostaFilas } from "src/models/filas/fila.model";
import { DocumentoService } from "src/services/documentos.service";

//@UseGuards(JwtAuthGuard)
@Resolver(of => Documento,)
export class DocumentoResolver {

    constructor(private documentoService: DocumentoService) { }

    @Query(returns => RespostaDocumentos,{nullable: true})
    async documentos_qualidade(@Args('objParam',{nullable: true}) objParam: DocumentosParams)
    {
        return this.documentoService.Get_Documentos(objParam);
    }

    @Query(returns => TokenArquivo)
    async token_arquivo(@Args('cd_Documento') cd_Documento: number, @Token()ds_Token:string)
    {
        return this.documentoService.Get_Token_Documento(cd_Documento, ds_Token)
    }
}

