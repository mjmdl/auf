import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PersonSource} from "src/database/sources/person.source";
import {PersonEntity} from "../entities/person.entity";
import {Repository} from "typeorm";

@Injectable()
export class PersonRepository implements PersonSource {
	@InjectRepository(PersonEntity)
	private readonly personRepository: Repository<PersonEntity>;
}
