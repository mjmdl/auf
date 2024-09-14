import {AccountModel} from "../models/account.model";

export abstract class AccountSource {
	abstract exists(where: Partial<AccountModel>): Promise<boolean>;
	abstract insert(account: Partial<AccountModel>): Promise<Partial<AccountModel>>;
}
