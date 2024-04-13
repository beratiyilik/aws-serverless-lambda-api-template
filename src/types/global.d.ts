import { IUtils } from "../utils";

declare global {
  namespace NodeJS {
    interface Global {
      Utils: IUtils;
    }
  }

  interface ObjectConstructor {
    // toJSON(obj: Object, options?: SerializationOptions): string;
  }
  interface Object {
    // toJSON(options?: SerializationOptions): string;
  }

  interface StringConstructor {
    // toObject<T>(obj: String, reviver?: (key: string, value: any) => any): T;
  }
  interface String {
    isFalsyOrEmpty(): boolean;
    isFalsyOrWhiteSpace(): boolean;
    toObject<T>(reviver?: (key: string, value: any) => any): T;
  }

  interface ArrayConstructor {}
  interface Array<T> {
    groupBy(fn: (item: T) => string): Record<string, T[]>;
    thenBy(fn: (item: T) => string): T[];
  }

  const Utils: IUtils;
}

export {};
