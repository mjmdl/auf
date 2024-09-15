import {Inject, Injectable} from "@nestjs/common";
import {TokenService} from "../token.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwTokenService implements TokenService {
	@Inject(JwtService)
	private readonly jwtService: JwtService;

	async sign(payload: any, secret: string, duration: string): Promise<string> {
		return this.jwtService.sign(payload, {secret, expiresIn: duration});
	}

	async decode(token: string): Promise<any> {
		return this.jwtService.decode(token);
	}

	async verify(token: string, secret: string): Promise<any> {
		return this.jwtService.verify(token, {secret});
	}
}
