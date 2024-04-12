import middy from "@middy/core";
import { handleErrorInGateway } from "./errors";
import {
  ExtendedContext,
  ExtendedEvent,
  ExtendedResult,
} from "../types/events";

import { FieldError, ValidationError } from "./http-errors";

const detailToFieldError = ({
  dataPath = "",
  message = "",
}: any): FieldError => {
  const match = /should have required property (.*)/.exec(message);
  if (match) return new FieldError(match[1], "Field cannot be empty");

  const pathSegments = dataPath.split(".");
  return new FieldError(pathSegments[pathSegments.length - 1], message);
};

const customErrorHandler = () => {
  return {
    onError: async (
      request: middy.Request<
        ExtendedEvent,
        ExtendedResult,
        Error,
        ExtendedContext
      >
    ): Promise<void> => {
      let error: Error = request.error as Error;

      // this comes from inputSchema validation
      if (error.name === "BadRequestError") {
        const details = (error as any).details;
        if (Array.isArray(details))
          error = new ValidationError(
            error.message || error.name,
            details.map(detailToFieldError)
          );
      }

      const headers = {
        ...request.response?.headers,
        "Content-Type": "application/json",
      };
      const response: ExtendedResult = handleErrorInGateway(error);
      response.headers = {
        ...headers,
        ...response.headers,
      };

      request.response = response;
    },
  };
};

export default customErrorHandler;
