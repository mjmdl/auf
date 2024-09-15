import {Controller, Inject, Post} from "@nestjs/common";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {LogOutService} from "./logout.service";
import {Token} from "src/authorize/decorators/token.decorator";

@ApiTags("Authentication")
@Controller("authentic/logout")
export class LogOutController {
	@Inject(LogOutService)
	private readonly logOutService: LogOutService;

	@ApiOperation({summary: "End session."})
	@Post()
	async logOut(@Token() [token]: [string, string]): Promise<void> {
		return this.logOutService.logOut(token);
	}
}
