import middy from "@middy/core";
import {
  ExtendedContext,
  ExtendedEvent,
  ExtendedResult,
} from "../types/events";
import { toJSON } from "../utils/json";
import { HTTP_STATUS_CODES } from "../constants/http";

interface CustomJsonResponderOptions {
  /*
  statusCode?: number;
  resultBody?: boolean;
  defaultHeaders?: { [header: string]: string | boolean | number };
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

      if (
        request.response.body !== undefined &&
        typeof request.response.body !== "string"
      )
        request.response.body = <string>toJSON(request.response.body);
    },
  };
};

export default customJsonResponder;
