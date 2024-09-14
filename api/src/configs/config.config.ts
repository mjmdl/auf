import {Logger} from "@nestjs/common";
import {ConfigModuleOptions} from "@nestjs/config";
import {plainToInstance} from "class-transformer";
import {IsNotEmpty, IsPort, validateSync} from "class-validator";

class EnvironmentDto {
	@IsNotEmpty()
	@IsPort()
	serverPort: number = 3000;
}

export const configModuleOptions: ConfigModuleOptions = {
	isGlobal: true,
	validate: validateEnvironment,
};

function validateEnvironment(config: Record<string, any>): Record<string, any> {
	const environment = plainToInstance(EnvironmentDto, config);

	const errors = validateSync(environment);
	if (errors.length >= 1) {
		const logger = new Logger(validateEnvironment.name);

		for (const error of errors) {
			for (const constraint of Object.values(error.constraints)) {
				logger.fatal(constraint);
			}
		}

		throw new Error("One or more errors within the .env file.");
	}

	return environment;
}
