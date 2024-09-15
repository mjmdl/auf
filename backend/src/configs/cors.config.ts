import {INestApplication} from "@nestjs/common";
import {CorsOptions} from "@nestjs/common/interfaces/external/cors-options.interface";

const corsOptions: CorsOptions = {
	methods: "POST,GET,PUT,PATCH,DELETE,OPTIONS",
	origin: "*",
};

export function configCors(app: INestApplication<any>): void {
	app.enableCors(corsOptions);
}
