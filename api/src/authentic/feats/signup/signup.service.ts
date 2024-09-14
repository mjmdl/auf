import {BadRequestException, Inject, Injectable} from "@nestjs/common";
import {SignUpDto} from "./dtos/signup.dto";
import {AccountSource} from "src/database/sources/account.source";
import {PersonSource} from "src/database/sources/person.source";
import {ConfigService} from "@nestjs/config";
import {HashService} from "src/hash/hash.service";

@Injectable()
export class SignUpService {
	@Inject(AccountSource)
	private readonly accountSource: AccountSource;

	@Inject(PersonSource)
	private readonly personSource: PersonSource;

	@Inject(HashService)
	private readonly hashService: HashService;

	private readonly hashSaltRounds: number;
	constructor(configService: ConfigService) {
		this.hashSaltRounds = configService.getOrThrow("hashSaltRounds");
	}

	async signUp(signUpDto: SignUpDto): Promise<void> {
		const [emailUsed, usernameUsed] = await Promise.all([
			this.personSource.exists({email: signUpDto.email}),
			this.accountSource.exists({username: signUpDto.username}),
		]);

		if (emailUsed) {
			throw new BadRequestException({
				tag: "EMAIL_USED",
				blurp: "Email is already in use by another user.",
			});
		}

		if (usernameUsed) {
			throw new BadRequestException({
				tag: "USERNAME_USED",
				blurp: "Username is already in use by another user.",
			});
		}

		const [hashedPassword, insertedPerson] = await Promise.all([
			this.hashService.process(signUpDto.password, this.hashSaltRounds),
			this.personSource.insert({name: signUpDto.name, email: signUpDto.email}),
		]);

		try {
			await this.accountSource.insert({
				username: signUpDto.username,
				password: hashedPassword,
				personId: insertedPerson.id,
			});
		} catch (error) {
			await this.personSource.delete({id: insertedPerson.id});
			throw error;
		}
	}
}
