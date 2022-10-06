/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyResult } from "aws-lambda";
import { BAD_GATEWAY_ERROR } from "../constants/errors";
import {
  BadRequestError,
  ValidationError,
  NotFoundError,
  BadGatewayError,
  UnauthorizedError,
} from "./httpErrors";

export function handleErrorInGateway(error: Error): APIGatewayProxyResult {
  let status: number;
  let errorBody: any = undefined;

  if (error instanceof UnauthorizedError) {
    status = 401;
    errorBody = { ...error, stack: undefined };
  } else if (error instanceof BadRequestError) {
    status = 400;
    errorBody = { ...error, stack: undefined };
  } else if (error instanceof ValidationError) {
    status = 400;
    errorBody = {
      code: "FieldError",
      errors: (error as ValidationError).errors,
    };
  } else if (error instanceof NotFoundError) {
    status = 404;
    errorBody = { ...error, stack: undefined };
  } else if (error instanceof BadGatewayError) {
    status = 502;
    errorBody = { description: BAD_GATEWAY_ERROR };
  } else {
    status = 500;
    errorBody = { description: error.message };
  }
  return {
    statusCode: status,
    body: JSON.stringify(errorBody),
  };
}
