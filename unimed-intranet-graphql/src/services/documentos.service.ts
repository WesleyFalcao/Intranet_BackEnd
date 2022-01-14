import { Injectable } from "@nestjs/common";
import { IntranetFacade } from "../facades/intranet.facade";
import { Resposta } from "src/models/resposta.entity";
import { DocumentosParams } from "src/models/documentos/documentos.params";
import { FileTokenService } from "./token.service";
import { TokenArquivo } from "src/models/documentos/token-arquivo.model";
import { Documento } from "src/models/documentos/documento.model";


@Injectable()
export class DocumentoService {
    constructor(
        private documentoFacade: IntranetFacade, private tokenService: FileTokenService
    ) { }

    async Get_Documentos(params: DocumentosParams){

        let resposta = new Resposta<any>()

        const response = await this.documentoFacade.Get_Documentos(params);

        if (response.status)
            resposta.data = response.data
        else
            resposta = response
        return resposta.data;
    }

    async Get_Token_Documento(cd_Documento: number, ds_Token: string){
        
        let resposta = new Resposta<TokenArquivo>();
    
        resposta.data = {ds_Token: this.tokenService.Encode_Login({cd_Documento}, ds_Token)}

        return resposta.data;
    }

    async Get_Nome_Documento(cd_Documento: number){

        let resposta = new Resposta<Documento>()

        const response = await this.documentoFacade.Get_Documento(cd_Documento);

        if (response.status)
            resposta.data = response.data
        else
            resposta = response
        return resposta.data;
    }
}


// o service responde ao facade todo o body da requisição, exemplo:

// "nm_Documento": "AQUISIÇÃO DE MATERIAIS E SERVIÇOS",
//             "nm_Arquivo": "PR-ADM-001_rev12.pdf",
//             "dt_Documento": "2018-06-19T00:00:00",
//             "nr_Revisao": "12",
//             "cd_Processo": 4,
//             "cd_Filial": "01",
//             "nr_Grupo": "2",
//             "cd_Setor": 1,
//             "nm_Processo": "Aquisição"