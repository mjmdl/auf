import "dotenv/config";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {configValidator} from "./configs/validator.config";
import {ConfigService} from "@nestjs/config";
import {Logger} from "@nestjs/common";
import {configSwagger} from "./configs/swagger.config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	configValidator(app, app.select(AppModule));

	const configService = app.get(ConfigService);
	const serverPort = configService.getOrThrow("serverPort");
	const docsPath = configSwagger(app);

	await app.listen(serverPort, () =>
		app.getUrl().then(url => {
			const logger = new Logger(bootstrap.name);
			logger.verbose(`Listening to port ${url}.`);
			logger.verbose(`Docs available at ${url}/${docsPath}`);
		}),
	);
}
bootstrap();
