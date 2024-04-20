import "./extensions";
import "./enable-error-to-json";
import "./override-console";
import * as logger from "./log";
import { toJSON, toObject, SerializationOptions } from "./json";

export interface IUtils {
  log: (...params: any[]) => void;
  logError: (...params: any[]) => void;
  logInfo: (...params: any[]) => void;
  logWarn: (...params: any[]) => void;
  logDebug: (...params: any[]) => void;
  toJSON: (value: any, options?: SerializationOptions) => string;
  toObject: <Type = unknown>(
    text: string,
    reviver?: (key: string, value: any) => any
  ) => Type;

  toTitleCase: (input: string) => string;
}

const Utils: IUtils = {
  ...logger,
  toJSON,
  toObject,

  toTitleCase: (input: string) =>
    input.replace(/\b\w/g, (char) => char.toUpperCase()),
};

export default Utils;
export * from "./promise";
