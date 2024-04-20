// entry point
import Utils from "./../utils";
(global as any).Utils = Utils;
// exports all the handlers
export { default as getVersion } from "./get-version";
export * from "./dashboard";
