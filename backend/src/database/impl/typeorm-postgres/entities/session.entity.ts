import {SessionKind, SessionModel, sessionRules} from "src/database/models/session.model";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import {AccountEntity} from "./account.entity";

@Entity("session")
@Unique("token_uq", ["token"])
export class SessionEntity implements SessionModel {
	@PrimaryGeneratedColumn("uuid", {name: "id"})
	id: string;

	@Column({
		name: "kind",
		type: "enum",
		enum: SessionKind,
		enumName: "session_kind",
		default: sessionRules.kindDefault,
	})
	kind: SessionKind;

	@Column({name: "token", type: "text"})
	token: string;

	@Column({name: "expires_at", type: "timestamptz", nullable: true})
	expiresAt: Date;

	@Column({name: "account_id", type: "uuid"})
	accountId: string;

	@ManyToOne(() => AccountEntity, account => account.sessions)
	@JoinColumn({name: "account_id", foreignKeyConstraintName: "account_fk", referencedColumnName: "id"})
	account: AccountEntity;
}
