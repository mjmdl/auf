import {ApiProperty} from "@nestjs/swagger";
import {SessionKind, sessionKindName} from "src/database/models/session.model";

export class SessionDto {
	@ApiProperty({description: "Kind of session token.", enum: SessionKind, enumName: sessionKindName})
	kind: SessionKind;

	@ApiProperty({description: "Session token."})
	token: string;

	@ApiProperty({description: "Expiration date of session token."})
	expiresAt: Date;
}
