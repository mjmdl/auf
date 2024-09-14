import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class LogInDto {
	@ApiProperty({description: "Account username."})
	@IsNotEmpty()
	@IsString()
	username: string;

	@ApiProperty({description: "Account password."})
	@IsNotEmpty()
	@IsString()
	password: string;
}
