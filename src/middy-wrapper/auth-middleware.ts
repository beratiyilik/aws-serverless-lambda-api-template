import middy, { MiddlewareObj } from "@middy/core";
import { UnauthorizedError } from "./http-errors";
import {
  ExtendedContext,
  ExtendedEvent,
  ExtendedResult,
} from "../types/events";
import { logInfo } from "../utils";

export const AUTHORIZATION_HEADER_NOT_FOUND = "Authorization header not found!";

const customAuthMiddleware = ({
  allowedPrincipals = [],
}: {
  allowedPrincipals?: string[];
}): MiddlewareObj<ExtendedEvent, ExtendedResult, Error, ExtendedContext> => {
  return {
    before: async (
      request: middy.Request<
        ExtendedEvent,
        ExtendedResult,
        Error,
        ExtendedContext
      >
    ) => {
      const { event } = request;
      const token: string | undefined =
        event.headers.Authorization || event.headers.authorization;
      if (!token) throw new UnauthorizedError(AUTHORIZATION_HEADER_NOT_FOUND);

      logInfo(allowedPrincipals);

      // Optional: Attach additional user info to the context if authentication succeeds
      // request.context.authUser = { userId: "user123" };
    },
  };
};

export default customAuthMiddleware;
