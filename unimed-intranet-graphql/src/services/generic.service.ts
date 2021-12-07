import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Resposta } from "src/models/resposta.entity";

@Injectable()
export class ApiGenericService {
    constructor(private jwtService: JwtService) { }


    Tratar_Erro(error: any) {
        if (error) {
            switch (error.status) {
                case 401:
                    throw new HttpException(new Resposta().Tratar_Erro("Rota não autorizada para o usuário", 401) as any, HttpStatus.UNAUTHORIZED);
                case 400:
                    if (error.data.statusCode == 200) {
                        throw new HttpException(error.data, HttpStatus.BAD_REQUEST);
                    } else if (error.data.error == 'invalid_grant') {
                        return { data: null, motivos_Critica: [{ propriedade: "", criticas: [error.data.error_description] }], status: false, statusCode: 400 }
                    } else {
                        throw new HttpException(error.data, HttpStatus.BAD_REQUEST);
                    }
                default:
                    if (error.data) {
                        throw new HttpException(error.data, HttpStatus.INTERNAL_SERVER_ERROR)
                    } else {
                        throw new HttpException(new Resposta().Tratar_Erro("Ocorreu um erro inesperado na Api. ERR:" + error.message) as any, HttpStatus.INTERNAL_SERVER_ERROR);
                    }
            }
        } else {
            throw new HttpException(new Resposta().Tratar_Erro("Ocorreu um erro inesperado na Api") as any, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    Tratar_Erro_View(error: any) {
        let message = ""
        let statusCode = 500

        if (error.message == 'jwt expired') {
            message = "Tempo de reprodução do arquivo expirado. Por favor, gere novamente";
            statusCode = 401
        } else {
            let motivos_Critica: any;

            if (error.response?.motivos_Critica) {
                motivos_Critica = error.response?.motivos_Critica
                statusCode = error.response.statusCode
            } else {
                var str = String.fromCharCode.apply(String, error.response ?? error.data);
                motivos_Critica = JSON.parse(str)?.motivos_Critica;
                statusCode = JSON.parse(str)?.statusCode
            }

            message = motivos_Critica?.map(element => element.criticas?.join(".\n"))?.join(".\n")
        }

        return { statusCode, message }
    }
}