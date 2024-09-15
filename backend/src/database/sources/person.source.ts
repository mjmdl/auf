import {PersonModel} from "../models/person.model";

export abstract class PersonSource {
	abstract exists(where: Partial<PersonModel>): Promise<boolean>;
	abstract insert(account: Partial<PersonModel>): Promise<Partial<PersonModel>>;
	abstract delete(where: Partial<PersonModel>): Promise<number>;
}
