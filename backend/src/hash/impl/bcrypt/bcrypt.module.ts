import {Module} from "@nestjs/common";
import {HashService} from "src/hash/hash.service";
import {BcryptService} from "./bcrypt.service";

@Module({
	providers: [{provide: HashService, useClass: BcryptService}],
	exports: [HashService],
})
export class BcryptModule {}
