import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length} from "class-validator";
import {accountRules} from "src/database/models/account.model";
import {personRules} from "src/database/models/person.model";

export class SignUpDto {
	@ApiProperty({description: "Display name."})
	@IsNotEmpty()
	@IsString()
	@Length(personRules.nameMin, personRules.nameMax)
	name: string;

	@ApiProperty({description: "E-mail."})
	@IsNotEmpty()
	@IsEmail()
	@Length(personRules.emailMin, personRules.emailMax)
	email: string;

	@ApiProperty({description: "Username used to log-in."})
	@IsNotEmpty()
	@IsString()
	@Length(accountRules.usernameMin, accountRules.usernameMax)
	username: string;

	@ApiProperty({description: "Password used to log-in."})
	@IsNotEmpty()
	@IsStrongPassword()
	@Length(accountRules.passwordMin, accountRules.passwordMax)
	password: string;
}
