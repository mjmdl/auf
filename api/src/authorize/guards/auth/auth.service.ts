import {ExecutionContext, Inject, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {Reflector} from "@nestjs/core";
import {Request} from "express";
import {UserDto} from "src/authentic/feats/login/dtos/user.dto";
import {isPublicKey} from "src/authorize/decorators/is-public.decorator";
import {SessionKind} from "src/database/models/session.model";
import {SessionSource} from "src/database/sources/session.source";
import {TokenService} from "src/token/token.service";

export const userKey = "user";

@Injectable()
export class AuthService {
	@Inject(Reflector)
	private readonly reflector: Reflector;

	@Inject(TokenService)
	private readonly tokenService: TokenService;

	@Inject(SessionSource)
	private readonly sessionSource: SessionSource;

	private readonly sessionSecret: string;
	constructor(configService: ConfigService) {
		this.sessionSecret = configService.getOrThrow("sessionSecret");
	}

	async auth(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.get<boolean>(isPublicKey, context.getHandler());
		if (isPublic) {
			return true;
		}

		const request: Request = context.switchToHttp().getRequest();
		const {authorization} = request.headers;

		if (!authorization?.length) {
			return false;
		}

		const [type, token] = authorization?.split(" ");
		if (type.toLowerCase() != SessionKind.bearer.toLowerCase() || !token) {
			return false;
		}

		const userDto: UserDto = await this.tokenService.verify(token, this.sessionSecret).catch(() => undefined);
		if (!userDto) {
			return false;
		}

		const session = await this.sessionSource.find({accountId: userDto.accountId, token, kind: SessionKind.bearer});
		if (!session || new Date(session.expiresAt) < new Date()) {
			return false;
		}

		request[userKey] = userDto;
		return true;
	}
}
