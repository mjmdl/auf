import {SessionModel} from "../models/session.model";

export abstract class SessionSource {
	abstract find(where: Partial<SessionModel>): Promise<Partial<SessionModel>>;
	abstract insert(session: Partial<SessionModel>): Promise<Partial<SessionModel>>;
	abstract delete(where: Partial<SessionModel>): Promise<number>;
	abstract deleteExpired(): Promise<number>;
}
