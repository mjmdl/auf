import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {SessionModel} from "src/database/models/session.model";
import {SessionSource} from "src/database/sources/session.source";
import {SessionEntity} from "../entities/session.entity";
import {Repository} from "typeorm";

@Injectable()
export class SessionRepository implements SessionSource {
	@InjectRepository(SessionEntity)
	private readonly sessionRepository: Repository<SessionEntity>;

	async insert(session: Partial<SessionModel>): Promise<Partial<SessionModel>> {
		const insertion = await this.sessionRepository.insert(session);
		return insertion.identifiers[0];
	}
}
