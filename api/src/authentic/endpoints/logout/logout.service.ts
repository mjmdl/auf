import {Inject, Injectable} from "@nestjs/common";
import {SessionKind} from "src/database/models/session.model";
import {SessionSource} from "src/database/sources/session.source";

@Injectable()
export class LogOutService {
	@Inject(SessionSource)
	private readonly sessionSource: SessionSource;

	async logOut(token: string): Promise<void> {
		await this.sessionSource.delete({token, kind: SessionKind.bearer});
	}
}
