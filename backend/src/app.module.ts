import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {configModuleOptions} from "./configs/config.config";
import {DatabaseModule} from "./database/database.module";
import {exceptionFilter} from "./configs/exceptions.config";
import {AuthenticModule} from "./authentic/authentic.module";
import {AuthorizeModule} from "./authorize/authorize.module";
import {authGuard} from "./authorize/guards/auth/auth.guard";

@Module({
	imports: [ConfigModule.forRoot(configModuleOptions), DatabaseModule, AuthenticModule, AuthorizeModule],
	providers: [exceptionFilter, authGuard],
})
export class AppModule {}
