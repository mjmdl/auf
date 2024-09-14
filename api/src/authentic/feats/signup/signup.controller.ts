import {Body, Controller, Inject, Post} from "@nestjs/common";
import {SignUpService} from "./signup.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {SignUpDto} from "./dtos/signup.dto";

@ApiTags("Authentication")
@Controller("authentic/signup")
export class SignUpController {
	@Inject(SignUpService)
	private readonly signUpService: SignUpService;

	@ApiOperation({summary: "Create an account."})
	@Post()
	async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
		return this.signUpService.signUp(signUpDto);
	}
}
