import {Body, Controller, Inject, Post} from "@nestjs/common";
import {ApiCreatedResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LogInDto} from "./dtos/login.dto";
import {SessionDto} from "./dtos/session.dto";
import {LogInService} from "./login.service";

@ApiTags("Authentication")
@Controller("authentic/login")
export class LogInController {
	@Inject(LogInService)
	private readonly logInService: LogInService;

	@ApiOperation({summary: "Access with your account."})
	@ApiCreatedResponse({type: () => SessionDto})
	@Post()
	async logIn(@Body() logInDto: LogInDto): Promise<SessionDto> {
		return this.logInService.logIn(logInDto);
	}
}
