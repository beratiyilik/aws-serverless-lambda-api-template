import { toJSON, SerializationOptions } from "./json";
declare global {
  interface ObjectConstructor {
    // toJSON(obj: Object, options?: SerializationOptions): string;
  }
  interface Object {
    toJSON(options?: SerializationOptions): string;
  }
}

Object.prototype.toJSON = function (options?: SerializationOptions): string {
  return toJSON(this, options);
};

/*
Object.toJSON = function (obj: Object, options?: SerializationOptions): string {
  return toJSON(obj, options);
};
*/

export {};
