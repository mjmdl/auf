import {AccountModel, accountRules} from "src/database/models/account.model";
import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import {PersonEntity} from "./person.entity";
import {SessionEntity} from "./session.entity";

@Entity("account")
@Unique("username_uq", ["username"])
export class AccountEntity implements AccountModel {
	@PrimaryGeneratedColumn("uuid", {name: "id", primaryKeyConstraintName: "pk_account"})
	id: string;

	@Column({name: "username", type: "varchar", length: accountRules.usernameMax})
	username: string;

	@Column({name: "password", type: "varchar", length: accountRules.passwordLength})
	password: string;

	@Column({name: "person_id", type: "uuid"})
	personId: string;

	@OneToOne(() => PersonEntity, person => person.account)
	@JoinColumn({name: "person_id", referencedColumnName: "id", foreignKeyConstraintName: "person_fk"})
	person: PersonEntity;

	@OneToMany(() => SessionEntity, session => session.account)
	sessions: SessionEntity[];
}
