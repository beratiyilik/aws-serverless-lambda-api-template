import { toJSON } from "./json";
declare global {
  interface Object {
    toJSON(): string;
  }
}

Object.prototype.toJSON = function (): string {
  return toJSON(this);
};

export {};
