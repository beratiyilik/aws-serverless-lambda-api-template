import middy from "@middy/core";
import {
  ExtendedContext,
  ExtendedEvent,
  ExtendedResult,
  Headers,
} from "../types/events";
import { HTTP_STATUS_CODES } from "../constants/http";

interface CustomJsonResponderOptions {}

const DEFAULT_HEADERS: Headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "Content-Type": "application/json",
};

const customJsonResponder = ({}: CustomJsonResponderOptions) => {
  return {
    after: async (
      request: middy.Request<
        ExtendedEvent,
        ExtendedResult,
        Error,
        ExtendedContext
      >
    ) => {
      if (!request.response) request.response = {} as ExtendedResult;

      request.response.statusCode =
        request.response.statusCode || HTTP_STATUS_CODES.OK;

      request.response.headers = {
        ...DEFAULT_HEADERS,
        ...request.response?.headers,
      };
    },
  };
};

export default customJsonResponder;
