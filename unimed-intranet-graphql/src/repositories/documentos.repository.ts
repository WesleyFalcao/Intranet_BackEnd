import { HttpService, Injectable } from "@nestjs/common";
import { DocumentosParams } from "src/models/documentos/documentos.params";
import { Options } from "src/models/general/options.model";
import { DocumentosCEQSearchParam } from "src/models/general/paginated.doc.model";
import { Resposta } from "src/models/resposta.entity";
import { ApiGenericService } from "src/services/generic.service";

@Injectable()
export class DocumentosRepository {

    options: Options

    constructor(private readonly httpService: HttpService,
        private readonly apiService: ApiGenericService,
    ) { }

    async Get_Documentos(params: DocumentosParams = null) {
        try {
            const response = await this.httpService.get(process.env.BASE_API_INTRANET + `v1/Documentos`, { ...this.options, params }).toPromise() as any
            
            response.data.data = { data: response.data.data, nr_Registros: response.data.nr_Registros }
            
            return response.data
            
        } catch (error) {

            return this.apiService.Tratar_Erro(error?.response);
        }
    }

    async Get_Download_Documento(cd_Documento: number) {

        try {
            const response = await this.httpService.get(process.env.BASE_API_INTRANET + `V1/Documentos/${cd_Documento}/Arquivo`, {
                ...this.options,
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/pdf', ...this.options.headers
                }
            }).toPromise()
            return response.data
        } catch (error) {
            return this.apiService.Tratar_Erro(error?.response);
        }
    }

    async Get_Documento(cd_Documento: number) {
        try {
            const response = await this.httpService.get(process.env.BASE_API_INTRANET + `V1/Documentos/${cd_Documento}`, { ...this.options }).toPromise()
            return response.data
        } catch (error) {
            return this.apiService.Tratar_Erro(error?.response);
        }
    }
}