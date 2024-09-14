import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {jwtModuleAsyncOptions} from "./configs/jwt.config";
import {TokenService} from "../token.service";
import {JwTokenService} from "./jwtoken.service";

@Module({
	imports: [JwtModule.registerAsync(jwtModuleAsyncOptions)],
	providers: [{provide: TokenService, useClass: JwTokenService}],
	exports: [TokenService],
})
export class JwTokenModule {}
