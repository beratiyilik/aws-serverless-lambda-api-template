import middy from "@middy/core";
import cors from "@middy/http-cors";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import validator from "@middy/validator";
import customErrorHandler from "./error-handler";
import customJsonResponder from "./json-responder";
import customJsonBodyParser from "./json-body-parser";
import customAuthMiddleware from "./auth-middleware";
import { LambdaMiddlewareOptions } from "../types/events";

export const lambdaMiddyWrapper = ({
  lambda,
  inputSchema,
  auth = false,
  allowedPrincipals = [],
}: LambdaMiddlewareOptions) => {
  const middleware = middy(lambda)
    .use(httpHeaderNormalizer())
    .use(customJsonBodyParser());

  if (inputSchema)
    middleware.use(
      validator({
        eventSchema: inputSchema,
      })
    );

  if (auth)
    middleware.use(
      customAuthMiddleware({
        allowedPrincipals,
      })
    );

  return middleware
    .use(customJsonResponder({}))
    .use(customErrorHandler())
    .use(cors());
};
