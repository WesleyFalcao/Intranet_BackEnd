import { HttpService, Injectable } from "@nestjs/common";
import { Options } from "src/models/general/options.model";
import { GruposceqParams } from "src/models/gruposceq/grupo-ceq.params";
import { ApiGenericService } from "src/services/generic.service";

@Injectable()
export class GruposceqRepository {

    options: Options

    constructor(private readonly httpService: HttpService,
        private readonly apiService: ApiGenericService,
    ) { }

    async Get_Grupos_CEQ(params: GruposceqParams) {
        try {
            const response = await this.httpService.get(process.env.BASE_API_INTRANET + `v1/Gruposceq`, this.options).toPromise()

            return response.data
        } catch (error) {
            return this.apiService.Tratar_Erro(error?.response);
        }
    }  //O RESPONSE FAZ UMA REQUISIÇÃO PRA API DO C# E ARMAZENA O QUE A API DEVOLVEU, NO CASO O RESULTADO DA QUERY
}