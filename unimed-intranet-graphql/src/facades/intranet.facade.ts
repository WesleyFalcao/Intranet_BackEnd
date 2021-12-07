import { Injectable } from "@nestjs/common";
import { DocumentosParams } from "src/models/documentos/documentos.params";
import { Options } from "src/models/general/options.model";
import { GruposceqParams } from "src/models/gruposceq/grupo-ceq.params";
import { ProcessoParams } from "src/models/processos/processo.params";
import { RamalParams } from "src/models/ramais/ramal.params";
import { DepartamentosRepository } from "src/repositories/departamentos.repository";
import { DocumentosRepository } from "src/repositories/documentos.repository";
import { GruposceqRepository } from "src/repositories/grupos-ceq.repository";
import { ProcessoRepository } from "src/repositories/processos.repository";
import { RamalRepository } from "src/repositories/ramais.repository";

@Injectable()
export class IntranetFacade {

    /** @description Configuração para enviar o token */
    options: Options =
        {
            auth: { "username": "internal", "password": "intALL576@uds#" },
            headers: {
                "X-Source": "PORTAL_INTRANET",
            }
        };

    constructor(
        
        private processoRepository: ProcessoRepository,      
        private ramalRepository: RamalRepository,
        private grupoceqRepository: GruposceqRepository,
        private documentoRepository: DocumentosRepository,
        private departamentoRepository: DepartamentosRepository, 

    ){       
        this.processoRepository.options = this.options
        this.ramalRepository.options = this.options
        this.grupoceqRepository.options = this.options
        this.documentoRepository.options = this.options
        this.departamentoRepository.options = this.options
    }

    Get_Processos = (params: ProcessoParams) => this.processoRepository.Get_Processos(params)
    Get_Ramais = (params: RamalParams) => this.ramalRepository.Get_Ramais(params)
    Get_Grupos_CEQ = (params: GruposceqParams) => this.grupoceqRepository.Get_Grupos_CEQ(params)
    Get_Documentos = (params: DocumentosParams) => this.documentoRepository.Get_Documentos(params)
    Get_Departamentos = () => this.departamentoRepository.Get_Departamentos()
    Get_Download_Documento = (cd_Documento: number) => this.documentoRepository.Get_Download_Documento(cd_Documento)
    Get_Documento = (cd_Documento: number) => this.documentoRepository.Get_Documento(cd_Documento)
}