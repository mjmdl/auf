import {Module} from "@nestjs/common";
import {SignUpController} from "./feats/signup/signup.controller";
import {SignUpService} from "./feats/signup/signup.service";
import {DatabaseModule} from "src/database/database.module";
import {HashModule} from "src/hash/hash.module";
import {TokenModule} from "src/token/token.module";
import {LogInController} from "./feats/login/login.controller";
import {LogInService} from "./feats/login/login.service";

@Module({
	imports: [DatabaseModule, HashModule, TokenModule],
	controllers: [SignUpController, LogInController],
	providers: [SignUpService, LogInService],
})
export class AuthenticModule {}
