import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {configModuleOptions} from "./configs/config.config";
import {DatabaseModule} from "./database/database.module";

@Module({
	imports: [ConfigModule.forRoot(configModuleOptions), DatabaseModule],
})
export class AppModule {}
