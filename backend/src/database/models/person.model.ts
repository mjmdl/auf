import {AccountModel} from "./account.model";

export const personRules = {
	nameMin: 3,
	nameMax: 255,
	emailMin: 5,
	emailMax: 255,
} as const;

export class PersonModel {
	id: string;
	name: string;
	email: string;
	account: AccountModel;
}
