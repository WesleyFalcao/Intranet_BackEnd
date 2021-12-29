import { Controller, Get, HttpStatus, Query, Res } from "@nestjs/common";
import { Set_Mimetype } from "src/utils/utils";
import { Response } from "express";
import { FileTokenService } from "src/services/token.service";
import { IntranetFacade } from "src/facades/intranet.facade";
import { ApiGenericService } from "src/services/generic.service";

@Controller("documentos")
export class DocumentosController {
    
    constructor(private tokenService: FileTokenService, private intranetFacade: IntranetFacade, private genericService: ApiGenericService){
      
    }

    @Get()
    async Download_Documento(
        @Res() res: Response,
        @Query() query: any) {
        try {
            let jwtPayload = this.tokenService.decrypt(query.token).id;

            const response = await this.intranetFacade.Get_Download_Documento(jwtPayload.cd_Documento)
            const objarquivo = await this.intranetFacade.Get_Documento(jwtPayload.cd_Documento)
            console.log(objarquivo)
            res.set({
                'Content-Type': Set_Mimetype(objarquivo.data.nm_Arquivo),
                'Content-Disposition': `inline;filename=documento_${objarquivo.data.nm_Arquivo}`
            });

            res.status(HttpStatus.OK).end(response);
        } catch (error) {
            const { statusCode, message } = this.genericService.Tratar_Erro_View(error)
            res.status(statusCode)
            res.render(`error-page.hbs`, { error: message });
        }
    }
}