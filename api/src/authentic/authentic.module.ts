import {Module} from "@nestjs/common";
import {SignUpController} from "./feats/signup/signup.controller";
import {SignUpService} from "./feats/signup/signup.service";
import {DatabaseModule} from "src/database/database.module";
import {HashModule} from "src/hash/hash.module";

@Module({
	imports: [DatabaseModule, HashModule],
	controllers: [SignUpController],
	providers: [SignUpService],
})
export class AuthenticModule {}
