import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {configModuleOptions} from "./configs/config.config";
import {DatabaseModule} from "./database/database.module";
import {exceptionFilter} from "./configs/exceptions.config";
import {AuthenticModule} from "./authentic/authentic.module";

@Module({
	imports: [ConfigModule.forRoot(configModuleOptions), DatabaseModule, AuthenticModule],
	providers: [exceptionFilter],
})
export class AppModule {}
