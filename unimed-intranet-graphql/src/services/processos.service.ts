import { Injectable } from "@nestjs/common";
import { IntranetFacade } from "../facades/intranet.facade";
import { Resposta } from "src/models/resposta.entity";
import { ProcessoParams } from "src/models/processos/processo.params";


@Injectable()
export class ProcessoService {
    constructor(
        private processoFacade: IntranetFacade,
    ) { }

    async Get_Processos(params: ProcessoParams) {
        let resposta = new Resposta<any>()

        const response = await this.processoFacade.Get_Processos(params);

        if (response.status)
            resposta.data = response.data
        else
            resposta = response

        return resposta.data;
    }
}
