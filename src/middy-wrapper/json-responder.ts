import middy from "@middy/core";
import {
  ExtendedContext,
  ExtendedEvent,
  ExtendedResult,
} from "../types/events";
import { HTTP_STATUS_CODES } from "../constants/http";

interface CustomJsonResponderOptions {
  /*
  statusCode?: number;
  resultBody?: boolean;
  defaultHeaders?: { [header: string]: string | boolean | number } | undefined;
  */
}

const DEFAULT_HEADERS: { [header: string]: string | boolean | number } = {
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

      const defaults = {
        statusCode: HTTP_STATUS_CODES.OK,
        defaultHeaders: DEFAULT_HEADERS,
      };

      request.response.statusCode =
        request.response.statusCode || defaults.statusCode;

      request.response.headers = {
        ...defaults.defaultHeaders,
        ...request.response.headers,
      };

      // request.response.body !== undefined && typeof request.response.body !== "string"
      if (typeof request.response.body === "object")
        request.response.body = (<object>request.response.body).toJSON();
    },
  };
};

export default customJsonResponder;
