import { BAD_REQUEST_ERROR, UNAUTHORIZED_ERROR } from "../constants/errors";

export class FieldError extends Error {
  public readonly field: string | number;
  public readonly description: string;

  public constructor(field: string | number, message: string) {
    super();
    this.field = field;
    this.description = message;
  }
}
export class ValidationError extends Error {
  public readonly errors: Error[];

  public constructor(fieldErrors: FieldError[]) {
    super();
    this.errors = fieldErrors;
  }
}

export class InvalidStateError extends Error {
  public readonly description: string;

  public constructor(description: string) {
    super(BAD_REQUEST_ERROR);
    this.description = description;
  }
}
export class NotFoundError extends Error {
  public readonly description: string;

  public constructor(description: string) {
    super(BAD_REQUEST_ERROR);
    this.description = description;
  }
}
export class GoneError extends Error {
  public readonly description: string;

  public constructor(description: string) {
    super(BAD_REQUEST_ERROR);
    this.description = description;
  }
}
export class ConflictError extends Error {
  public readonly description: string;

  public constructor(description: string) {
    super(BAD_REQUEST_ERROR);
    this.description = description;
  }
}
export class BadGatewayError extends Error {
  public readonly description: string;

  public constructor(description: string) {
    super(BAD_REQUEST_ERROR);
    this.description = description;
  }
}
export class BadRequestError extends Error {
  public readonly description: string;

  public constructor(description: string) {
    super(BAD_REQUEST_ERROR);
    this.description = description;
  }
}
export class UnauthorizedError extends Error {
  public readonly description: string;

  public constructor(description: string) {
    super(UNAUTHORIZED_ERROR);
    this.description = description;
  }
}
