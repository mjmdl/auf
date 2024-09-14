import {AccountModel} from "./account.model";

export enum SessionKind {
	bearer = "BEARER",
}

export const sessionKindName = "SessionKind";
export const sessionKindValues = Object.values(SessionKind);

export const sessionRules = {
	kindDefault: SessionKind.bearer,
} as const;

export class SessionModel {
	id: string;
	kind: SessionKind;
	token: string;
	expiresAt: Date;
	accountId: string;
	account: AccountModel;
}
