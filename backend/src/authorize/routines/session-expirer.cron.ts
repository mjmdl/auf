import {Inject, Injectable, Logger} from "@nestjs/common";
import {Cron, CronExpression} from "@nestjs/schedule";
import {SessionSource} from "src/database/sources/session.source";

@Injectable()
export class SessionExpirerCron {
	private readonly logger = new Logger(SessionExpirerCron.name);

	constructor(
		@Inject(SessionSource)
		private readonly sessionSource: SessionSource,
	) {
		this.expireSessions();
	}

	@Cron(CronExpression.EVERY_HOUR)
	async expireSessions(): Promise<void> {
		const expirations = await this.sessionSource.deleteExpired();
		if (expirations >= 1) {
			this.logger.verbose(`${expirations} sessions were expired.`);
		}
	}
}
