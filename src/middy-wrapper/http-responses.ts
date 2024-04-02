// httpResponses.ts
import { HTTP_STATUS_CODES } from "../constants/http";
import { stringify } from "../utils/string";
import { ExtendedResult } from "../types/events";

const Response = {
  Ok: (data?: any): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.OK,
    body: stringify(data),
  }),
  Created: (data?: any): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.CREATED,
    body: stringify(data),
  }),
  NoContent: (): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.NO_CONTENT,
    body: "",
  }),
  BadRequest: (data?: any): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
    body: data ? stringify(data) : "Bad Request",
  }),
  Unauthorized: (): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.UNAUTHORIZED,
    body: "Unauthorized",
  }),
  NotFound: (data?: any): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.NOT_FOUND,
    body: data ? stringify(data) : "Not Found",
  }),
  Conflict: (data?: any): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.CONFLICT,
    body: data ? stringify(data) : "Conflict",
  }),
  UnprocessableEntity: (data?: any): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY,
    body: data ? stringify(data) : "Unprocessable Entity",
  }),
  InternalServerError: (data?: any): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    body: data ? stringify(data) : "Internal Server Error",
  }),
  NotImplemented: (): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.NOT_IMPLEMENTED,
    body: "Not Implemented",
  }),
  ServiceUnavailable: (): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.SERVICE_UNAVAILABLE,
    body: "Service Unavailable",
  }),
  Forbidden: (data?: any): ExtendedResult => ({
    statusCode: HTTP_STATUS_CODES.FORBIDDEN,
    body: data || "Forbidden",
  }),
};

export default Response;
