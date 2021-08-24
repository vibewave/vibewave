import { Error, Request, Response, NextFunction } from 'express';
export type MiddlewareFn = (
	req: Request,
	res: Response,
	next: NextFunction
) => void;
export type ErrorRequestHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => void;

//db.ts
interface ssl {
	rejectUnauthorized: boolean;
}
interface DialectOptions {
	ssl: ssl;
}

export interface Config {
	logging?: boolean;
	dialectOptions?: DialectOptions;
}

// export interface ResponseError extends Error {
// 	status?: number;
// }

export class ApiError extends Error {
	status: number;
	constructor(status?: number, message?: string, name?: string) {
			super(message);
			this.name = name;
			this.status = status;
	}
}

// export interface Error {
// 	status?: number;
// }
