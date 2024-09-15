import {CanActivate, ExecutionContext, Inject, Injectable, Provider} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {APP_GUARD} from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
	@Inject(AuthService)
	private readonly authService: AuthService;

	async canActivate(context: ExecutionContext): Promise<boolean> {
		return await this.authService.auth(context);
	}
}

export const authGuard: Provider = {
	provide: APP_GUARD,
	useClass: AuthGuard,
};
