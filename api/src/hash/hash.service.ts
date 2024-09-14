export abstract class HashService {
	abstract process(original: string, saltRounds: number): Promise<string>;
	abstract compare(input: string, hashed: string): Promise<boolean>;
}
