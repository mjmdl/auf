import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {configModuleOptions} from "./configs/config.config";
import {DatabaseModule} from "./database/database.module";
import {exceptionFilter} from "./configs/exceptions.config";

@Module({
	imports: [ConfigModule.forRoot(configModuleOptions), DatabaseModule],
	providers: [exceptionFilter],
})
export class AppModule {}
