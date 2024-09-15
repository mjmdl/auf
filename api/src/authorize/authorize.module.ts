import {Module} from "@nestjs/common";
import {AuthService} from "./guards/auth/auth.service";
import {TokenModule} from "src/token/token.module";
import {DatabaseModule} from "src/database/database.module";

@Module({
	imports: [DatabaseModule, TokenModule],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthorizeModule {}
