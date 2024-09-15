import {Module} from "@nestjs/common";
import {BcryptModule} from "./impl/bcrypt/bcrypt.module";

@Module({
	imports: [BcryptModule],
	exports: [BcryptModule],
})
export class HashModule {}
