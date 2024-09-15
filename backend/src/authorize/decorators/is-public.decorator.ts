import {CustomDecorator, SetMetadata} from "@nestjs/common";

export const isPublicKey = "isPublic";

export function IsPublic(): CustomDecorator<string> {
	return SetMetadata(isPublicKey, true);
}
