import {getReasonPhrase, StatusCodes} from "http-status-codes";
import express from "express";
import {APIResponse, json} from "./messages";
import {logger} from "../logging/logger";

export class BaseAPIError extends Error {
    code: number;

    constructor(code: number, message?: string) {
        super();
        this.code = code;
        if (message) {
            this.message = message;
        } else {
            this.message = getReasonPhrase(code);
        }
    }

    response(): APIResponse<string> {
        return {
            status: this.code,
            body: this.message,
        };
    }
}

export class InternalServerError extends BaseAPIError {
    constructor(message?: string) {
        super(StatusCodes.INTERNAL_SERVER_ERROR, message);
    }
}

export class UnauthorizedError extends BaseAPIError {
    constructor(message?: string) {
        super(StatusCodes.UNAUTHORIZED, message);
    }
}

export class NotFoundError extends BaseAPIError {
    constructor(message?: string) {
        super(StatusCodes.NOT_FOUND, message);
    }
}

export const handler: express.ErrorRequestHandler = (err: any, req: express.Request, res: express.Response, next) => {
    switch (true) {
        case err instanceof BaseAPIError:
            json(res, err.response());
            break;
        default:
            logger.field("error", err.message).error("internal server error")
            json(res, new InternalServerError().response());
    }
}

export const Catcher = (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<express.Handler>): TypedPropertyDescriptor<express.Handler> => {
    const handler = descriptor.value;
    descriptor.value = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            await handler.apply(this, ...[req, res, next]);
        } catch (err) {
            next(err);
        }
    };
    return descriptor;
}
