import middy from "@middy/core";
import { handleErrorInGateway } from "./errors";
import {
  ExtendedContext,
  ExtendedEvent,
  ExtendedResult,
  Headers,
} from "../types/events";
import { FieldError, ValidationError } from "./http-errors";

/*
const detailToFieldError = ({
  dataPath = "",
  message = "",
}: any): FieldError => {
  const match = /should have required property (.*)/.exec(message);
  if (match) return new FieldError(match[1], "Field cannot be empty");

  const pathSegments = dataPath.split(".");
  return new FieldError(pathSegments[pathSegments.length - 1], message);
};
*/

const detailToFieldError = ({
  dataPath = "",
  message = "",
}: any): FieldError => {
  let fieldName = dataPath.split(".").pop();

  // should have required property
  const requiredPropertyMatch = /should have required property (.*)/.exec(
    message
  );
  if (requiredPropertyMatch)
    return new FieldError(requiredPropertyMatch[1], "Field cannot be empty");

  // should be string/number/boolean/etc
  const typeMismatchMatch =
    /should be (string|number|boolean|object|array)/.exec(message);
  if (typeMismatchMatch)
    return new FieldError(fieldName, `Expected type ${typeMismatchMatch[1]}`);

  // should match format
  const formatMatch = /should match format "(.*)"/.exec(message);
  if (formatMatch)
    return new FieldError(
      fieldName,
      `Should match the format ${formatMatch[1]}`
    );

  // should NOT have additional properties
  const additionalPropsMatch = /should NOT have additional properties/.exec(
    message
  );
  if (additionalPropsMatch)
    return new FieldError(fieldName, "Should not have additional properties");

  return new FieldError(fieldName || "unknown", message);
};

const DEFAULT_HEADERS: Headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "Content-Type": "application/json",
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

      // Schema validation errors
      if (error.name === "BadRequestError") {
        const details = (error as any).details;
        if (Array.isArray(details))
          error = new ValidationError(
            error.message || error.name,
            details.map(detailToFieldError)
          );
      }

      const response: ExtendedResult = handleErrorInGateway(error);

      response.headers = {
        ...DEFAULT_HEADERS,
        ...request.response?.headers,
      };

      request.response = response;
    },
  };
};

export default customErrorHandler;
