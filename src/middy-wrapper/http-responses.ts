import { HTTP_STATUS_CODES } from "../constants/http";
import { ExtendedResult, Headers } from "../types/events";

const Response = {
  Ok: (data?: any, headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.OK,
    body: Utils.toJSON(data),
    headers,
  }),
  Created: (data?: any, headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.CREATED,
    body: Utils.toJSON(data),
    headers,
  }),
  NoContent: (headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.NO_CONTENT,
    body: "",
    headers,
  }),
  BadRequest: (data?: any, headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
    body: data ? Utils.toJSON(data) : "Bad Request",
    headers,
  }),
  Unauthorized: (headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.UNAUTHORIZED,
    body: "Unauthorized",
    headers,
  }),
  NotFound: (data?: any, headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.NOT_FOUND,
    body: data ? Utils.toJSON(data) : "Not Found",
    headers,
  }),
  Conflict: (data?: any, headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.CONFLICT,
    body: data ? Utils.toJSON(data) : "Conflict",
    headers,
  }),
  UnprocessableEntity: (data?: any, headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY,
    body: data ? Utils.toJSON(data) : "Unprocessable Entity",
    headers,
  }),
  InternalServerError: (data?: any, headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    body: data ? Utils.toJSON(data) : "Internal Server Error",
    headers,
  }),
  NotImplemented: (headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.NOT_IMPLEMENTED,
    body: "Not Implemented",
    headers,
  }),
  ServiceUnavailable: (headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.SERVICE_UNAVAILABLE,
    body: "Service Unavailable",
    headers,
  }),
  Forbidden: (data?: any, headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.FORBIDDEN,
    body: data ? Utils.toJSON(data) : "Forbidden",
    headers,
  }),
};

export default Response;
