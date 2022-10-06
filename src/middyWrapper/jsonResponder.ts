import middy from "@middy/core";
import { APIGatewayProxyResult, Context } from "aws-lambda";
import { Event } from "../types/Events";

export const jsonResponder = <E extends Event = Event>({
  statusCode = 200,
  resultBody = true,
  defaultHeaders = {},
}: {
  statusCode?: number;
  resultBody?: boolean;
  defaultHeaders?: { [header: string]: boolean | number | string };
}): middy.MiddlewareObject<E, APIGatewayProxyResult, Context> => ({
  after: (
    handler: middy.HandlerLambda<E, APIGatewayProxyResult>,
    next: (err?: unknown) => void
  ): void => {
    const { response } = handler;
    const headers = {
      "Content-Type": "application/json",
      ...defaultHeaders,
      ...response.headers,
    };

    delete response.headers;
    if (response) {
      handler.response = {
        statusCode,
        headers,
        body: resultBody ? JSON.stringify(response) : "",
      };
    } else {
      handler.response = { statusCode, headers, body: "" };
    }
    next();
  },
});
