import {Module} from "@nestjs/common";
import {AuthService} from "./guards/auth/auth.service";
import {TokenModule} from "src/token/token.module";
import {DatabaseModule} from "src/database/database.module";
import {SessionExpirerCron} from "./routines/session-expirer.cron";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
	imports: [DatabaseModule, ScheduleModule.forRoot(), TokenModule],
	providers: [AuthService, SessionExpirerCron],
	exports: [AuthService],
})
export class AuthorizeModule {}
