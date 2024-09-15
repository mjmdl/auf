import {PersonModel} from "./person.model";
import {SessionModel} from "./session.model";

export const accountRules = {
	usernameMin: 3,
	usernameMax: 255,
	passwordMin: 8,
	passwordMax: 32,
	passwordLength: 255,
} as const;

export class AccountModel {
	id: string;
	username: string;
	password: string;
	personId: string;
	person: PersonModel;
	sessions: SessionModel[];
}
