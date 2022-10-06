import middy from "@middy/core";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import jsonBodyParser from "@middy/http-json-body-parser";
import cors from "@middy/http-cors";
import validator from "@middy/validator";
import { APIGatewayProxyResult } from "aws-lambda";
import { MiddyWrapperInput, ExtendedEvent } from "../types/Events";
import { errorHandler } from "./errorHandler";
import { jsonResponder } from "./jsonResponder";

export const lambdaMiddyWrapper = <E extends ExtendedEvent = ExtendedEvent>({
  lambda,
  inputSchema,
  statusCode = 200,
  resultBody = true,
}: MiddyWrapperInput<E>): middy.Middy<E, APIGatewayProxyResult> => {
  return middy(lambda)
    .use(httpHeaderNormalizer())
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(jsonResponder<E>({ statusCode, resultBody }))
    .use(errorHandler<E>())
    .use(cors());
};
