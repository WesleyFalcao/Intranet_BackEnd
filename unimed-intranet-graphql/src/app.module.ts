import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GraphQLError } from 'graphql';
import { DocumentosController } from './controller/documentos.controller';
import { IntranetFacade } from './facades/intranet.facade';
import { AuthRepository } from './repositories/auth.repository';
import { DepartamentosRepository } from './repositories/departamentos.repository';
import { DocumentosRepository } from './repositories/documentos.repository';
import { GruposceqRepository } from './repositories/grupos-ceq.repository';
import { ProcessoRepository } from './repositories/processos.repository';
import { RamalRepository } from './repositories/ramais.repository';
import { AuthResolver } from './resolvers/auth.resolver';
import { DepartamentoResolver } from './resolvers/departamentos.resolver';
import { DocumentoResolver } from './resolvers/documentos.resolver';
import { GrupoceqResolver } from './resolvers/grupos-ceq.resolver';
import { ProcessoResolver } from './resolvers/processos.resolver';
import { RamalResolver } from './resolvers/ramais.resolver';
import { AuthService } from './services/auth.service';
import { DepartamentoService } from './services/departamentos.service';
import { DocumentoService } from './services/documentos.service';
import { ApiGenericService } from './services/generic.service';
import { GrupoceqService } from './services/grupos_ceq.service';
import { ProcessoService } from './services/processos.service';
import { RamalService } from './services/ramais.service';
import { FileTokenService } from './services/token.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.development.env',
        }),
        HttpModule.register({
            timeout: 1200000,
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            sortSchema: true,
            playground: true,
            debug: false,
            context: ({ req, res }) => ({ req, res }),
            rootValue: ({ req, res }) => ({ req, res }),
            formatError: (error) => {
                console.log(error)
                return new GraphQLError(
                    error.extensions?.response?.motivos_Critica?.find(element => !element.propriedade)?.criticas?.join("\n") ?? error.message,
                    undefined,
                    undefined,
                    undefined,
                    error.path,
                    undefined,
                    { motivos_Critica: error.extensions?.response?.motivos_Critica, statusCode: error.extensions?.response.statusCode }
                )
            }
        }),
        JwtModule.register({
            secret: process.env.jwtSecret,
            signOptions: {
                expiresIn: parseInt(process.env.jwtTime),
            },
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [
        DocumentosController
    ],
    providers: [
        ApiGenericService,
        RamalService,
        RamalResolver,
        RamalRepository,
        AuthRepository,
        AuthResolver,
        AuthService,
        IntranetFacade,
        ProcessoRepository,
        ProcessoResolver,
        ProcessoService,
        DepartamentosRepository,
        DepartamentoResolver,
        DepartamentoService,
        DocumentosRepository,
        DocumentoService,
        DocumentoResolver,
        GruposceqRepository,
        GrupoceqResolver,
        GrupoceqService,
        FileTokenService
    ],
})
export class AppModule { }
