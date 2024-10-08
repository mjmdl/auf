import {AccountModel} from "../models/account.model";

export abstract class AccountSource {
	abstract find(where: Partial<AccountModel>): Promise<AccountModel>;
	abstract exists(where: Partial<AccountModel>): Promise<boolean>;
	abstract insert(account: Partial<AccountModel>): Promise<Partial<AccountModel>>;
}
