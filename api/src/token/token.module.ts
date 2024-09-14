import {Module} from "@nestjs/common";
import {JwTokenModule} from "./impl/jwtoken.module";

@Module({
	imports: [JwTokenModule],
	exports: [JwTokenModule],
})
export class TokenModule {}
