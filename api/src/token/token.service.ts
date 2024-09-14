export abstract class TokenService {
	abstract sign(payload: any, secret: string, duration: string): Promise<string>;
	abstract decode(token: string): Promise<any>;
	abstract verify(token: string, secret: string): Promise<any>;
}
