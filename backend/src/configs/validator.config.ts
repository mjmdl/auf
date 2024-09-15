import {INestApplication, INestApplicationContext, ValidationPipe, ValidationPipeOptions} from "@nestjs/common";
import {UseContainerOptions, useContainer} from "class-validator";

const validationPipeOptions: ValidationPipeOptions = {
	always: true,
	forbidNonWhitelisted: true,
	forbidUnknownValues: true,
	transform: true,
	whitelist: true,
};

const useContainerOptions: UseContainerOptions = {
	fallbackOnErrors: true,
};

export function configValidator(app: INestApplication<any>, context: INestApplicationContext): void {
	const validationPipe = new ValidationPipe(validationPipeOptions);
	app.useGlobalPipes(validationPipe);
	useContainer(context, useContainerOptions);
}
