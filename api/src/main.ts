import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {configValidator} from "./configs/validator.config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	configValidator(app, app.select(AppModule));
	await app.listen(3000);
}
bootstrap();
