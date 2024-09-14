import {Injectable} from "@nestjs/common";
import {AccountSource} from "src/database/sources/account.source";
import {AccountEntity} from "../entities/account.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class AccountRepository implements AccountSource {
	@InjectRepository(AccountEntity)
	private readonly accountRepository: Repository<AccountEntity>;
}
