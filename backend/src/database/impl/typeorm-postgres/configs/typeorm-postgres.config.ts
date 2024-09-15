import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModuleAsyncOptions, TypeOrmModuleOptions} from "@nestjs/typeorm";

export const typeOrmPostgresConfig: TypeOrmModuleAsyncOptions = {
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: typeormPostgresFactory,
};

function typeormPostgresFactory(configService: ConfigService): TypeOrmModuleOptions {
	return {
		type: "postgres",
		host: configService.getOrThrow("postgresHost"),
		port: configService.getOrThrow("postgresPort"),
		username: configService.getOrThrow("postgresUsername"),
		password: configService.getOrThrow("postgresPassword"),
		database: configService.getOrThrow("postgresDatabase"),
		autoLoadEntities: true,
		synchronize: configService.getOrThrow("typeormSynchronizePostgres"),
	};
}
