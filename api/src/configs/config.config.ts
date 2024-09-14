import {Logger} from "@nestjs/common";
import {ConfigModuleOptions} from "@nestjs/config";
import {Transform, Type, plainToInstance} from "class-transformer";
import {IsBoolean, IsInt, IsNotEmpty, IsNumber, IsPort, IsString, IsUrl, Min, validateSync} from "class-validator";

class EnvironmentDto {
	@IsNotEmpty()
	@IsPort()
	serverPort: number = 3000;

	@IsNotEmpty()
	@IsUrl()
	postgresHost: string = "127.0.0.1";

	@IsNotEmpty()
	@IsPort()
	postgresPort: number = 5432;

	@IsNotEmpty()
	@IsString()
	postgresUsername: string = "postgres";

	@IsNotEmpty()
	@IsString()
	postgresPassword: string = "postgres";

	@IsNotEmpty()
	@IsString()
	postgresDatabase: string = "auf";

	@IsNotEmpty()
	@IsBoolean()
	@Transform(({value}) => (typeof value === "boolean" ? value : value === "true"))
	typeormSynchronizePostgres: boolean = false;

	@IsNotEmpty()
	@IsInt()
	@Min(1)
	@Type(() => Number)
	hashSaltRounds: number = 10;
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
