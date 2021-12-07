
import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { Fila, RespostaFilas } from "src/models/filas/fila.model";
import { Ramal } from "src/models/ramais/ramal.model";
import { RamalParams } from "src/models/ramais/ramal.params";
import { RamalService } from "src/services/ramais.service";

//@UseGuards(JwtAuthGuard)
@Resolver(of => Ramal)
export class RamalResolver {

    constructor(private ramalService: RamalService) { }

    @Query(returns => [Ramal],{nullable: true})
    async ramais(@Args('objParam',{nullable: true}) objParam: RamalParams)
    {
        return this.ramalService.Get_Ramais(objParam);
    }
}