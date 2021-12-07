import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class FileTokenService {

    tokenHeader: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.";

    constructor(
        private readonly jwtService: JwtService,
    ) { }

    public encrypt(payload: any): string {
        /**
         * 300/60 = 5 minutos
         */
        let strJwt = this.jwtService.sign({ type: "file", id: payload }, { expiresIn: 300 });
        return `${strJwt.split('.')[1]}.${strJwt.split('.')[2]}`;
    }

    Encode_Login(params: any, ds_Token: string) {
        return this.encrypt({
            ...params,
            ds_Login: (this.jwtService.decode(ds_Token) as any)?.ds_Login
        })
    }


    public decrypt(tokenPaylod: string): any {
        if (this.jwtService.verify(this.tokenHeader + tokenPaylod)) {
            return this.jwtService.decode(this.tokenHeader + tokenPaylod);
        } else {
            return null;
        }
    }

    public decrypt_without_validate(tokenPaylod: string): any {
        return this.jwtService.decode(this.tokenHeader + tokenPaylod);
    }
}