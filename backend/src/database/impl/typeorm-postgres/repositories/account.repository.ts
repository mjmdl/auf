import {Injectable} from "@nestjs/common";
import {AccountSource} from "src/database/sources/account.source";
import {AccountEntity} from "../entities/account.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class AccountRepository implements AccountSource {
	@InjectRepository(AccountEntity)
	private readonly accountRepository: Repository<AccountEntity>;

	async find(where: Partial<AccountEntity>): Promise<AccountEntity> {
		return this.accountRepository.findOne({
			select: {id: true, username: true, password: true, personId: true},
			where,
		});
	}

	async exists(where: Partial<AccountEntity>): Promise<boolean> {
		return this.accountRepository.existsBy(where);
	}

	async insert(person: Partial<AccountEntity>): Promise<Partial<AccountEntity>> {
		const insertion = await this.accountRepository.insert(person);
		return insertion.identifiers[0];
	}
}
