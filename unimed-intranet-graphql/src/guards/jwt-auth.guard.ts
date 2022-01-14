import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { IntranetFacade } from 'src/facades/intranet.facade';

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private intranetFacade: IntranetFacade) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;

        try {

            // Verifica a cache
            jwt.verify(req.headers.authorization?.replace("Bearer", ""), process.env.jwtSecret);

            // Seta o cabeçalho de autenticação
            this.intranetFacade.options.headers.Authorization = req.headers.authorization;

            // TODO: pesquisar como passar URL de base da API para o Axios + environments
            //Axios.defaults.baseURL = "http://localhost:55592/";
        }
        catch (error) {
            console.log(error);
            throw new HttpException("Token não é mais válido.", HttpStatus.UNAUTHORIZED);
        }

        return true;
    }
}