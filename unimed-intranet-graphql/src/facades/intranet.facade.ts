import { Injectable } from "@nestjs/common";
import { Options } from "src/models/general/options.model";
import { PaginatedSearchParam } from "src/models/general/pagianated.model";
import { RamalParams } from "src/models/ramais/ramal.params";
import { DepartamentosRepository } from "src/repositories/departamentos.repository";
import { DocumentosRepository } from "src/repositories/documentos.repository";
import { GruposceqRepository } from "src/repositories/grupos_ceq.repository";
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

    Get_Processos = () => this.processoRepository.Get_Processos()
    Get_Ramais = (params: RamalParams) => this.ramalRepository.Get_Ramais(params)
    Get_Grupos_CEQ = () => this.grupoceqRepository.Get_Grupos_CEQ()
    Get_Documentos = () => this.documentoRepository.Get_Documentos()
    Get_Departamentos = () => this.departamentoRepository.Get_Departamentos()
   // Set_Enviar_Mensagem_Medico = (params: MensagemInput) => this.mensagensRepository.Set_Enviar_Mensagem_Medico(params)
}