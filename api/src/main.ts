import "dotenv/config";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {configValidator} from "./configs/validator.config";
import {ConfigService} from "@nestjs/config";
import {Logger} from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	configValidator(app, app.select(AppModule));

	const configService = app.get(ConfigService);
	const serverPort = configService.getOrThrow("serverPort");

	await app.listen(serverPort, () => logServerPort(app.getUrl()));
}
bootstrap();

function logServerPort(url: Promise<string>): void {
	const logger = new Logger(bootstrap.name);
	url.then(url => logger.verbose(`Listening to port ${url}.`));
}
