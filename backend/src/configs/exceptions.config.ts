import {
	ArgumentsHost,
	Catch,
	HttpException,
	HttpStatus,
	Logger,
	ExceptionFilter as NestExceptionFilter,
	NotImplementedException,
	Provider,
} from "@nestjs/common";
import {APP_FILTER} from "@nestjs/core";
import {Request, Response} from "express";

@Catch()
class ExceptionFilter implements NestExceptionFilter {
	private readonly logger = new Logger(ExceptionFilter.name);

	catch(exception: any, host: ArgumentsHost): void {
		const httpHost = host.switchToHttp();
		const request: Request = httpHost.getRequest();
		const response: Response = httpHost.getResponse();

		if (exception instanceof NotImplementedException || exception.message === "Method not implemented.") {
			this.logger.warn(`Not implemented branch was reached: ${request.url}`);
			response.status(HttpStatus.NOT_IMPLEMENTED).send();
			return;
		}

		if (exception instanceof HttpException) {
			response.status(exception.getStatus()).send(exception.getResponse());
			return;
		}

		this.logger.error(`Unhandled error: ${exception.message}`, exception.stack);
		response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
	}
}

export const exceptionFilter: Provider = {
	provide: APP_FILTER,
	useClass: ExceptionFilter,
};
