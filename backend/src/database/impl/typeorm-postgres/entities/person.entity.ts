import {PersonModel, personRules} from "src/database/models/person.model";
import {Column, Entity, OneToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import {AccountEntity} from "./account.entity";

@Entity("person")
@Unique("email_uq", ["email"])
export class PersonEntity implements PersonModel {
	@PrimaryGeneratedColumn("uuid", {name: "id"})
	id: string;

	@Column({name: "name", type: "varchar", length: personRules.nameMax})
	name: string;

	@Column({name: "email", type: "varchar", length: personRules.emailMax})
	email: string;

	@OneToOne(() => AccountEntity, account => account.person)
	account: AccountEntity;
}
