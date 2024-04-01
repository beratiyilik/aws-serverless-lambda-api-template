export const ERROR_KEYS = {
  BAD_REQUEST_ERROR: "BAD_REQUEST_ERROR", // 400 Bad Request
  UNAUTHORIZED_ERROR: "UNAUTHORIZED_ERROR", // 401 Unauthorized
  FORBIDDEN_ERROR: "FORBIDDEN_ERROR", // 403 Forbidden
  NOT_FOUND_ERROR: "NOT_FOUND_ERROR", // 404 Not Found
  CONFLICT_ERROR: "CONFLICT_ERROR", // 409 Conflict
  GONE_ERROR: "GONE_ERROR", // 410 Gone
  VALIDATION_ERROR: "VALIDATION_ERROR", // 422 Unprocessable Entity
  FIELD_ERROR: "FIELD_ERROR", // 422 Unprocessable Entity
  BAD_GATEWAY_ERROR: "BAD_GATEWAY_ERROR", // 502 Bad Gateway
  INVALID_STATE_ERROR: "INVALID_STATE_ERROR", // This could be associated with a variety of codes depending on the context
};

export const BAD_GATEWAY_ERROR = "Bad Gateway";
export const BAD_REQUEST_ERROR = "Bad Request";
export const UNKNOWN_ERROR = "An unknown error occurred";
export const UNAUTHORIZED_ERROR = "Unauthorized";
export const NOT_FOUND_ERROR = "NOT_FOUND_ERROR";
export const INVALID_TOKEN = "Token is not valid or has expired";

export const AUTHORIZATION_HEADER_REQUIRED_ERROR =
  "An authorization header is required!";
export const USER_NOT_FOUND_ERROR = "User not found!";
export const MEDICAL_API_UNAUTHORIZED_ERROR =
  "Your rights do not meet with the permission that you are trying to reach!";
