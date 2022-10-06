/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Callback,
  Context,
} from "aws-lambda";

export interface Event extends APIGatewayProxyEvent {
  version?: string;
  currentUser?: any;
}

export declare type EventHandler<E extends Event = Event> =
  | ((
      event: E,
      context: Context,
      callback: Callback<APIGatewayProxyResult>
    ) => any)
  | ((event: E, context: Context) => Promise<any>);

export interface MiddyWrapperInput<E extends Event = Event> {
  lambda: EventHandler<E>;
  allowedPrincipals?: string[];
  inputSchema?: any;
  statusCode?: number;
  resultBody?: boolean;
  requireAuthentication?: boolean;
}

export interface ExtendedEvent extends Event {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
}
