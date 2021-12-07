import { HttpService, Injectable } from "@nestjs/common";
import { Resposta } from "src/models/resposta.entity";
import { LoginResponse } from "src/models/login/login-response.model";
import { LoginInput } from "src/models/login/login.input";
import { ApiGenericService } from "src/services/generic.service";

@Injectable()
export class AuthRepository {

    constructor(private readonly httpService: HttpService,
        private readonly apiService: ApiGenericService,
    ) { }

    async Login(obj_Login: LoginInput): Promise<Resposta<LoginResponse>> {
        try {
            const response = await this.httpService.post(process.env.BASE_API_NTRANET + `v1/Login`, obj_Login).toPromise()

            return response.data
        } catch (error) {
            throw this.apiService.Tratar_Erro(error?.response);
        }
    }
}