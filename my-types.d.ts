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
