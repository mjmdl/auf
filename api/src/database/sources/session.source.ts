import {SessionModel} from "../models/session.model";

export abstract class SessionSource {
	abstract insert(session: Partial<SessionModel>): Promise<Partial<SessionModel>>;
}
