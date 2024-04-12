import { HTTP_STATUS_CODES } from "../constants/http";
import { ExtendedResult } from "../types/events";

type Headers =
  | { [header: string]: string | boolean | number }
  | Record<string, string | boolean | number>
  | undefined;

const Response = {
  Ok: (data?: any, headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.OK,
    body: data,
    headers: headers,
  }),
  Created: (data?: any, headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.CREATED,
    body: data,
    headers: headers,
  }),
  NoContent: (headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.NO_CONTENT,
    body: "",
    headers: headers,
  }),
  BadRequest: (data?: any, headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
    body: data || "Bad Request",
    headers: headers,
  }),
  Unauthorized: (headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.UNAUTHORIZED,
    body: "Unauthorized",
    headers: headers,
  }),
  NotFound: (data?: any, headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.NOT_FOUND,
    body: data || "Not Found",
    headers: headers,
  }),
  Conflict: (data?: any, headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.CONFLICT,
    body: data || "Conflict",
    headers: headers,
  }),
  UnprocessableEntity: (data?: any, headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY,
    body: data || "Unprocessable Entity",
    headers: headers,
  }),
  InternalServerError: (data?: any, headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    body: data || "Internal Server Error",
    headers: headers,
  }),
  NotImplemented: (headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.NOT_IMPLEMENTED,
    body: "Not Implemented",
    headers: headers,
  }),
  ServiceUnavailable: (headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.SERVICE_UNAVAILABLE,
    body: "Service Unavailable",
    headers: headers,
  }),
  Forbidden: (data?: any, headers: Headers = {}): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.FORBIDDEN,
    body: data || "Forbidden",
    headers: headers,
  }),
};

export default Response;
