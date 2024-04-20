import { toObject } from "../json";

String.prototype.isFalsyOrEmpty = function (): boolean {
  if (this === null || this === undefined) return true;
  return this === "";
};

String.prototype.isFalsyOrWhiteSpace = function (): boolean {
  if (this === null || this === undefined) return true;
  return this.trim() === "";
};

String.prototype.toObject = function <T>(
  reviver?: (key: string, value: any) => any
): T {
  return toObject(this.toString(), reviver);
};

/*
String.toObject = function <T>(
  this: StringConstructor,
  obj: String,
  reviver?: (key: string, value: any) => any
): T {
  return toObject(obj.toString(), reviver);
};
*/

export {};
