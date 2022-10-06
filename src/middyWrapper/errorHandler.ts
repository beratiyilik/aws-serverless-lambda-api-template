/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { APIGatewayProxyResult } from "aws-lambda";
import middy from "middy";
import { Event } from "../types/Events";
import { FieldError, ValidationError } from "./httpErrors";
import { handleErrorInGateway } from "./errors";

export const errorHandler = <E extends Event = Event>() => {
  const detailToFieldError = ({ dataPath = "", message = "" }): FieldError => {
    const match = /should have required property (.*)/.exec(message);
    if (match) {
      const field = match[1];
      return new FieldError(field, "Field cannot be empty");
    }

    const s = dataPath.split(".");
    return new FieldError(s[s.length - 1], message);
  };

  return {
    onError: (handler: middy.HandlerLambda<E, APIGatewayProxyResult>) => {
      let error: Error = handler.error;

      if (error.name === "BadRequestError") {
        const details = (error as any).details;
        if (Array.isArray(details)) {
          error = new ValidationError(details.map(detailToFieldError));
        }
      }

      const e = handleErrorInGateway(error);
      const { statusCode, body } = e;

      handler.response = {
        statusCode,
        body: JSON.stringify(body),
      };

      return Promise.resolve();
    },
  };
};
