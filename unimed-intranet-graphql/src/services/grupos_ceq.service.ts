import { Injectable } from "@nestjs/common";
import { IntranetFacade } from "src/facades/intranet.facade";
import { GruposceqParams } from "src/models/gruposceq/grupo-ceq.params";
import { Resposta } from "src/models/resposta.entity";

@Injectable()
export class GrupoceqService {
    constructor(
        private grupoceqFacade: IntranetFacade,
    ) { }

    async Get_Grupos_CEQ(params: GruposceqParams) {
        let resposta = new Resposta<any>()

        const response = await this.grupoceqFacade.Get_Grupos_CEQ(params);

        if (response.status)
            resposta.data = response.data
        else
            resposta = response

        return resposta.data;
    }

    async Get_Menu_CEQ(){
        let resposta = new Resposta<any>()

        const response = await this.grupoceqFacade.Get_Menu_CEQ();

        if(response.status)
            resposta.data = response.data
        else resposta = response

        return resposta.data;
    }
}
