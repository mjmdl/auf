import {Module} from "@nestjs/common";
import {TypeOrmPostgresModule} from "./impl/typeorm-postgres/typeorm-postgres.module";

@Module({
	imports: [TypeOrmPostgresModule],
})
export class DatabaseModule {}
