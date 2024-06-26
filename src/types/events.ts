/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Callback,
  Context,
} from "aws-lambda";

export type Headers =
  | { [header: string]: string | boolean | number }
  | Record<string, string | boolean | number>
  | undefined;

export interface ExtendedEvent extends APIGatewayProxyEvent {
  version?: string;
  claims?: Record<string, any>;
  user?: any;
}

export interface ExtendedResult extends APIGatewayProxyResult {}

export interface ExtendedContext extends Context {
  claims?: Record<string, any>;
}

export type Lambda = (
  event: ExtendedEvent,
  context: ExtendedContext
) => Promise<ExtendedResult>;

export interface LambdaMiddlewareOptions {
  lambda: Lambda;
  eventSchema?: Function | any;
  auth?: boolean;
  allowedPrincipals?: string[];
}

export type EventHandler<E extends ExtendedEvent = ExtendedEvent> = (
  event: E,
  context: ExtendedContext,
  callback?: Callback<ExtendedResult>
) => void | Promise<ExtendedResult>;

export interface MiddlewareInput<E extends ExtendedEvent = ExtendedEvent> {
  lambda: EventHandler<E>;
  eventSchema?: Function | any;
  auth?: boolean;
  allowedPrincipals?: string[];
}

export interface MiddlewareOutput {
  statusCode: number;
  body: string;
  headers?: Headers;
}

export interface EventWithBody extends ExtendedEvent {
  body: any;
}
