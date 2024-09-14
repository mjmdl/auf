import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {configModuleOptions} from "./configs/config.config";

@Module({
	imports: [ConfigModule.forRoot(configModuleOptions)],
})
export class AppModule {}
