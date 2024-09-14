import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmPostgresConfig} from "./configs/typeorm-postgres.config";

@Module({
	imports: [TypeOrmModule.forRootAsync(typeOrmPostgresConfig)],
})
export class TypeOrmPostgresModule {}
