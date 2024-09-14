import {Inject, Injectable, NotFoundException, NotImplementedException, UnauthorizedException} from "@nestjs/common";
import {LogInDto} from "./dtos/login.dto";
import {SessionDto} from "./dtos/session.dto";
import {AccountSource} from "src/database/sources/account.source";
import {HashService} from "src/hash/hash.service";
import {TokenService} from "src/token/token.service";
import {SessionSource} from "src/database/sources/session.source";
import {ConfigService} from "@nestjs/config";
import {UserDto} from "./dtos/user.dto";
import {SessionKind} from "src/database/models/session.model";

@Injectable()
export class LogInService {
	@Inject(AccountSource)
	private readonly accountSource: AccountSource;

	@Inject(SessionSource)
	private readonly sessionSource: SessionSource;

	@Inject(HashService)
	private readonly hashService: HashService;

	@Inject(TokenService)
	private readonly tokenService: TokenService;

	private readonly sessionSecret: string;
	private readonly sessionDuration: string;
	constructor(configService: ConfigService) {
		this.sessionSecret = configService.getOrThrow("sessionSecret");
		this.sessionDuration = configService.getOrThrow("sessionDuration");
	}

	async logIn(logInDto: LogInDto): Promise<SessionDto> {
		const account = await this.accountSource.find({username: logInDto.username});
		if (!account) {
			throw new NotFoundException({tag: "ACCOUNT_NOT_FOUND", blurp: "Invalid username."});
		}

		const passwordsMatch = await this.hashService.compare(logInDto.password, account.password);
		if (!passwordsMatch) {
			throw new UnauthorizedException({tag: "WRONG_PASSWORD", blurp: "Password is wrong."});
		}

		const userDto: UserDto = {
			accountId: account.id,
		};
		const token = await this.tokenService.sign(userDto, this.sessionSecret, this.sessionDuration);
		const decodedToken = await this.tokenService.decode(token);
		const expiresAt = new Date(decodedToken.exp * 1000);

		await this.sessionSource.insert({accountId: account.id, kind: SessionKind.bearer, token, expiresAt});

		return {
			token,
			kind: SessionKind.bearer,
			expiresAt,
		};
	}
}
