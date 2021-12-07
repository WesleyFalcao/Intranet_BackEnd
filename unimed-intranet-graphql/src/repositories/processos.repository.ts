import { HttpService, Injectable } from "@nestjs/common";
import { Options } from "src/models/general/options.model";
import { ProcessoParams } from "src/models/processos/processo.params";
import { ApiGenericService } from "src/services/generic.service";

@Injectable()
export class ProcessoRepository {

    options: Options

    constructor(private readonly httpService: HttpService,
        private readonly apiService: ApiGenericService,
    ) { }

    async Get_Processos(params: ProcessoParams) {
        try {

            const response = await this.httpService.get(process.env.BASE_API_INTRANET + `v1/Documentos/Processos`, this.options).toPromise()
            return response.data

        } catch (error) {
            return this.apiService.Tratar_Erro(error?.response);
        }
    }
}