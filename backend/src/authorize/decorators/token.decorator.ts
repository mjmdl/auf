import {ExecutionContext, createParamDecorator} from "@nestjs/common";

export const Token = createParamDecorator((data: unknown, context: ExecutionContext): [string, string] => {
	const request = context.switchToHttp().getRequest();
	const {authorization} = request.headers;
	const [type, token] = authorization?.split(" ") ?? [];
	return [token, type];
});
