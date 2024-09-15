import {ExecutionContext, createParamDecorator} from "@nestjs/common";
import {UserDto} from "../dtos/user.dto";
import {userKey} from "../guards/auth/auth.service";

export const User = createParamDecorator((data: unknown, context: ExecutionContext): UserDto => {
	const request = context.switchToHttp().getRequest();
	return request[userKey];
});
