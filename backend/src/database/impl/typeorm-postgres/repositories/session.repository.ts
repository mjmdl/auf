import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {SessionModel} from "src/database/models/session.model";
import {SessionSource} from "src/database/sources/session.source";
import {SessionEntity} from "../entities/session.entity";
import {LessThan, Repository} from "typeorm";

@Injectable()
export class SessionRepository implements SessionSource {
	@InjectRepository(SessionEntity)
	private readonly sessionRepository: Repository<SessionEntity>;

	async find(where: Partial<SessionModel>): Promise<Partial<SessionModel>> {
		const session = await this.sessionRepository.findOne({
			select: {id: true, accountId: true, expiresAt: true, kind: true, token: true},
			where,
		});
		return session;
	}

	async insert(session: Partial<SessionModel>): Promise<Partial<SessionModel>> {
		const insertion = await this.sessionRepository.insert(session);
		return insertion.identifiers[0];
	}

	async delete(where: Partial<SessionModel>): Promise<number> {
		const deletion = await this.sessionRepository.delete(where);
		return deletion.affected;
	}

	async deleteExpired(): Promise<number> {
		const deletion = await this.sessionRepository.delete({expiresAt: LessThan(new Date())});
		return deletion.affected;
	}
}
