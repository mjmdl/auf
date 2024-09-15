import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PersonSource} from "src/database/sources/person.source";
import {PersonEntity} from "../entities/person.entity";
import {Repository} from "typeorm";

@Injectable()
export class PersonRepository implements PersonSource {
	@InjectRepository(PersonEntity)
	private readonly personRepository: Repository<PersonEntity>;

	async exists(where: Partial<PersonEntity>): Promise<boolean> {
		return this.personRepository.existsBy(where);
	}

	async insert(person: Partial<PersonEntity>): Promise<Partial<PersonEntity>> {
		const insertion = await this.personRepository.insert(person);
		return insertion.identifiers[0];
	}

	async delete(where: Partial<PersonEntity>): Promise<number> {
		const deletion = await this.personRepository.delete(where);
		return deletion.affected;
	}
}
