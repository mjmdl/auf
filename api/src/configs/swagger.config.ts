import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

const openApiConfig = new DocumentBuilder()
	.setTitle(process.env.npm_package_name)
	.setDescription(process.env.npm_package_description)
	.setVersion(process.env.npm_package_version)
	.addTag("default")
	.build();

export function configSwagger(app: any): string {
	const path = "docs";
	const document = SwaggerModule.createDocument(app, openApiConfig);
	SwaggerModule.setup(path, app, document, {
		customSiteTitle: process.env.npm_package_name + " docs",
	});
	return path;
}
