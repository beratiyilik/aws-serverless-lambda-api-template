import { HTTP_STATUS_CODES } from "../constants/http";
import { ERROR_KEYS } from "../constants/errors";

export abstract class BaseError extends Error {
  public readonly description: string;
  public readonly key: string; // must be unique
  public readonly statusCode: number;
  protected constructor(description: string, key: string, statusCode: number) {
    super(description);
    this.description = description;
    this.key = key;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BadRequestError extends BaseError {
  constructor(description: string) {
    super(
      description,
      ERROR_KEYS.BAD_REQUEST_ERROR,
      HTTP_STATUS_CODES.BAD_REQUEST
    );
  }
}

export class UnauthorizedError extends BaseError {
  constructor(description: string) {
    super(
      description,
      ERROR_KEYS.UNAUTHORIZED_ERROR,
      HTTP_STATUS_CODES.UNAUTHORIZED
    );
  }
}

export class ForbiddenError extends BaseError {
  constructor(description: string) {
    super(description, ERROR_KEYS.FORBIDDEN_ERROR, HTTP_STATUS_CODES.FORBIDDEN);
  }
}

export class NotFoundError extends BaseError {
  constructor(description: string) {
    super(description, ERROR_KEYS.NOT_FOUND_ERROR, HTTP_STATUS_CODES.NOT_FOUND);
  }
}

export class BadGatewayError extends BaseError {
  constructor(description: string) {
    super(
      description,
      ERROR_KEYS.BAD_GATEWAY_ERROR,
      HTTP_STATUS_CODES.BAD_GATEWAY
    );
  }
}

export class FieldError extends BaseError {
  public readonly field: string | number;
  constructor(field: string | number, description: string) {
    super(
      description,
      ERROR_KEYS.FIELD_ERROR,
      HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY
    );
    this.field = field;
  }
}

export class ValidationError extends BaseError {
  public readonly errors: FieldError[];
  constructor(description: string, errors: FieldError[] = []) {
    super(
      description,
      ERROR_KEYS.VALIDATION_ERROR,
      HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY
    );
    this.errors = errors;
  }
}

export class InvalidStateError extends BaseError {
  constructor(description: string) {
    super(
      description,
      ERROR_KEYS.INVALID_STATE_ERROR,
      HTTP_STATUS_CODES.BAD_REQUEST
    );
  }
}

export class GoneError extends BaseError {
  constructor(description: string) {
    super(description, ERROR_KEYS.GONE_ERROR, HTTP_STATUS_CODES.GONE);
  }
}

export class ConflictError extends BaseError {
  constructor(description: string) {
    super(description, ERROR_KEYS.CONFLICT_ERROR, HTTP_STATUS_CODES.CONFLICT);
  }
}
