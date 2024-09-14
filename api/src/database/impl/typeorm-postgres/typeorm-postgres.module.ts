import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmPostgresConfig} from "./configs/typeorm-postgres.config";
import {AccountEntity} from "./entities/account.entity";
import {PersonEntity} from "./entities/person.entity";
import {AccountSource} from "src/database/sources/account.source";
import {AccountRepository} from "./repositories/account.repository";
import {PersonSource} from "src/database/sources/person.source";
import {PersonRepository} from "./repositories/person.repository";

@Module({
	imports: [
		TypeOrmModule.forRootAsync(typeOrmPostgresConfig),
		TypeOrmModule.forFeature([AccountEntity, PersonEntity]),
	],
	providers: [
		{provide: AccountSource, useClass: AccountRepository},
		{provide: PersonSource, useClass: PersonRepository},
	],
	exports: [AccountSource, PersonSource],
})
export class TypeOrmPostgresModule {}
