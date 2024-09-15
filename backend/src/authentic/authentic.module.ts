import {Module} from "@nestjs/common";
import {SignUpController} from "./endpoints/signup/signup.controller";
import {SignUpService} from "./endpoints/signup/signup.service";
import {DatabaseModule} from "src/database/database.module";
import {HashModule} from "src/hash/hash.module";
import {TokenModule} from "src/token/token.module";
import {LogInController} from "./endpoints/login/login.controller";
import {LogInService} from "./endpoints/login/login.service";
import {LogOutController} from "./endpoints/logout/logout.controller";
import {LogOutService} from "./endpoints/logout/logout.service";

@Module({
	imports: [DatabaseModule, HashModule, TokenModule],
	controllers: [SignUpController, LogInController, LogOutController],
	providers: [SignUpService, LogInService, LogOutService],
})
export class AuthenticModule {}
