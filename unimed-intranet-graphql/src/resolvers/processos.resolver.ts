
import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { Fila, RespostaFilas } from "src/models/filas/fila.model";
import { Processo } from "src/models/processos/processo.model";
import { ProcessoParams } from "src/models/processos/processo.params";
import { Ramal } from "src/models/ramais/ramal.model";
import { ProcessoService } from "src/services/processos.service";
import { parse } from "url";


//@UseGuards(JwtAuthGuard)
@Resolver(of => Processo)
export class ProcessoResolver {

    constructor(private processoService: ProcessoService) { }

    @Query(returns => [Processo],{nullable: true})
    async processo(@Args('objParam',{nullable: true}) objParam: ProcessoParams)
    {
        return this.processoService.Get_Processos(objParam);
    }  
}