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
    body: { error: error.description }.toJSON(),
  }),
  [ERROR_KEYS.UNAUTHORIZED_ERROR]: (error: UnauthorizedError) => ({
    statusCode: error.statusCode,
    body: { error: error.description }.toJSON(),
  }),
  [ERROR_KEYS.FORBIDDEN_ERROR]: (error: ForbiddenError) => ({
    statusCode: error.statusCode,
    body: { error: error.description }.toJSON(),
  }),
  [ERROR_KEYS.NOT_FOUND_ERROR]: (error: NotFoundError) => ({
    statusCode: error.statusCode,
    body: { error: error.description }.toJSON(),
  }),
  [ERROR_KEYS.BAD_GATEWAY_ERROR]: (error: BadGatewayError) => ({
    statusCode: error.statusCode,
    body: { error: error.description }.toJSON(),
  }),
  [ERROR_KEYS.FIELD_ERROR]: (error: BaseError) => {
    const fieldError = error as FieldError;
    return {
      statusCode: fieldError.statusCode,
      body: { error: fieldError.description, field: fieldError.field }.toJSON(),
    };
  },
  [ERROR_KEYS.VALIDATION_ERROR]: (error: BaseError) => {
    const validationError = error as ValidationError;
    return {
      statusCode: error.statusCode,
      body: {
        error: validationError.description,
        errors: validationError.errors.map(({ field, description }) => ({
          field,
          error: description,
        })),
      }.toJSON(),
    };
  },
  [ERROR_KEYS.INVALID_STATE_ERROR]: (error: InvalidStateError) => ({
    statusCode: error.statusCode,
    body: { error: error.description }.toJSON(),
  }),
  [ERROR_KEYS.GONE_ERROR]: (error: GoneError) => ({
    statusCode: error.statusCode,
    body: { error: error.description }.toJSON(),
  }),
  [ERROR_KEYS.CONFLICT_ERROR]: (error: ConflictError) => ({
    statusCode: error.statusCode,
    body: { error: error.description }.toJSON(),
  }),
};

export function handleErrorInGateway(error: Error): ExtendedResult {
  if (error instanceof BaseError && errorHandlers[error.key])
    return errorHandlers[error.key](error);

  // undefined errors are treated as internal server errors
  return {
    statusCode: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    body: {
      error: "Internal server error",
      description: error.message,
    }.toJSON(),
  };
}
