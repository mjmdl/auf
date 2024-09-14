import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmPostgresConfig} from "./configs/typeorm-postgres.config";
import {AccountEntity} from "./entities/account.entity";
import {PersonEntity} from "./entities/person.entity";
import {AccountSource} from "src/database/sources/account.source";
import {AccountRepository} from "./repositories/account.repository";
import {PersonSource} from "src/database/sources/person.source";
import {PersonRepository} from "./repositories/person.repository";
import {SessionSource} from "src/database/sources/session.source";
import {SessionRepository} from "./repositories/session.repository";
import {SessionEntity} from "./entities/session.entity";

@Module({
	imports: [
		TypeOrmModule.forRootAsync(typeOrmPostgresConfig),
		TypeOrmModule.forFeature([AccountEntity, PersonEntity, SessionEntity]),
	],
	providers: [
		{provide: AccountSource, useClass: AccountRepository},
		{provide: PersonSource, useClass: PersonRepository},
		{provide: SessionSource, useClass: SessionRepository},
	],
	exports: [AccountSource, PersonSource, SessionSource],
})
export class TypeOrmPostgresModule {}
