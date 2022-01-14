
import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { Fila, RespostaFilas } from "src/models/filas/fila.model";
import { Gruposceq } from "src/models/gruposceq/grupo-ceq.model";
import { GruposceqParams } from "src/models/gruposceq/grupo-ceq.params";
import { Ramal } from "src/models/ramais/ramal.model";
import { GrupoceqService } from "src/services/grupos_ceq.service";

//@UseGuards(JwtAuthGuard)  verifica se está logado, ele desconmentado causou o erro de token inválido
@Resolver(of => Gruposceq)
export class GrupoceqResolver {

    constructor(private gruposceqService: GrupoceqService) { }

    @Query(returns => [Gruposceq],{nullable: true})
    async grupoceq(@Args('objParam', {nullable: true})objParam: GruposceqParams) 
    {
        return this.gruposceqService.Get_Grupos_CEQ(objParam);
    }

    @Query(returns => [Gruposceq],{nullable: true})
    async menuceq(){
        return this.gruposceqService.Get_Menu_CEQ();
    }
}