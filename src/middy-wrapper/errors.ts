import { HTTP_STATUS_CODES } from "../constants/http";
import { ERROR_KEYS } from "../constants/errors";
import {
  BaseError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  BadGatewayError,
  FieldError,
  ValidationError,
  InvalidStateError,
  GoneError,
  ConflictError,
} from "./http-errors";
import { ExtendedResult } from "../types/events";

const errorHandlers: {
  [key: string]: (error: BaseError) => ExtendedResult;
} = {
  [ERROR_KEYS.BAD_REQUEST_ERROR]: (error: BadRequestError) => ({
    statusCode: error.statusCode,
    body: Utils.toJSON({ error: error.description }),
  }),
  [ERROR_KEYS.UNAUTHORIZED_ERROR]: (error: UnauthorizedError) => ({
    statusCode: error.statusCode,
    body: Utils.toJSON({ error: error.description }),
  }),
  [ERROR_KEYS.FORBIDDEN_ERROR]: (error: ForbiddenError) => ({
    statusCode: error.statusCode,
    body: Utils.toJSON({ error: error.description }),
  }),
  [ERROR_KEYS.NOT_FOUND_ERROR]: (error: NotFoundError) => ({
    statusCode: error.statusCode,
    body: Utils.toJSON({ error: error.description }),
  }),
  [ERROR_KEYS.BAD_GATEWAY_ERROR]: (error: BadGatewayError) => ({
    statusCode: error.statusCode,
    body: Utils.toJSON({ error: error.description }),
  }),
  [ERROR_KEYS.FIELD_ERROR]: (error: BaseError) => {
    const fieldError = error as FieldError;
    return {
      statusCode: fieldError.statusCode,
      body: Utils.toJSON({
        error: fieldError.description,
        field: fieldError.field,
      }),
    };
  },
  [ERROR_KEYS.VALIDATION_ERROR]: (error: BaseError) => {
    const validationError = error as ValidationError;
    return {
      statusCode: error.statusCode,
      body: Utils.toJSON({
        error: validationError.description,
        errors: validationError.errors.map(({ field, description }) => ({
          field,
          error: description,
        })),
      }),
    };
  },
  [ERROR_KEYS.INVALID_STATE_ERROR]: (error: InvalidStateError) => ({
    statusCode: error.statusCode,
    body: Utils.toJSON({ error: error.description }),
  }),
  [ERROR_KEYS.GONE_ERROR]: (error: GoneError) => ({
    statusCode: error.statusCode,
    body: Utils.toJSON({ error: error.description }),
  }),
  [ERROR_KEYS.CONFLICT_ERROR]: (error: ConflictError) => ({
    statusCode: error.statusCode,
    body: Utils.toJSON({ error: error.description }),
  }),
};

export function handleErrorInGateway(error: Error): ExtendedResult {
  if (error instanceof BaseError && errorHandlers[error.key])
    return errorHandlers[error.key](error);

  // undefined errors are treated as internal server errors
  return {
    statusCode: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    body: Utils.toJSON({
      error: "Internal server error",
      description: error.message,
    }),
  };
}
