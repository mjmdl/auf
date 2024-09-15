import {Injectable} from "@nestjs/common";
import {genSalt, hash, compare} from "bcrypt";
import {HashService} from "src/hash/hash.service";

@Injectable()
export class BcryptService implements HashService {
	async process(original: string, saltRounds: number): Promise<string> {
		const salt = await genSalt(saltRounds);
		return hash(original, salt);
	}

	async compare(input: string, hashed: string): Promise<boolean> {
		return compare(input, hashed);
	}
}
