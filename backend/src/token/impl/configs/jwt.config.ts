import {JwtModuleAsyncOptions, JwtModuleOptions} from "@nestjs/jwt";

export const jwtModuleAsyncOptions: JwtModuleAsyncOptions = {
	global: false,
	useFactory: configJwt,
};

function configJwt(): JwtModuleOptions {
	return {
		global: false,
	};
}
