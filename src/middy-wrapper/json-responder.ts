import middy from "@middy/core";
import {
  ExtendedContext,
  ExtendedEvent,
  ExtendedResult,
} from "../types/events";

interface CustomJsonResponderOptions {
  statusCode?: number;
  resultBody?: boolean;
  defaultHeaders?: { [header: string]: string | boolean | number };
}

const customJsonResponder = ({
  statusCode = 200,
  resultBody = true,
  defaultHeaders = {},
}: CustomJsonResponderOptions) => {
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

      request.response.statusCode = request.response.statusCode || statusCode;
      request.response.headers = {
        ...defaultHeaders,
        ...request.response.headers,
        "Content-Type": "application/json",
      };
      if (resultBody && !request.response.body)
        request.response.body = JSON.stringify({});
    },
  };
};

export default customJsonResponder;
