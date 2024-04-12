import { toJSON } from "./json";

const getPrefix = (): string => {
  const now = new Date();
  return `${now.getTime()}; ${now.toISOString()};`;
};

const argsToString = (...args: any[]): string => {
  return args.map((arg) => toJSON(arg)).join(" ");
};

// TODO: replace AWS CloudWatch
const ConsoleAPI = (() => {
  const url = "http://localhost:3000/log";
  const append = async (level: string, message: string): Promise<void> => {
    // TODO: Implement fetch here to send 'body' to the server
  };
  return {
    appendLog: async (...args: any[]): Promise<void> => {
      const message = `${getPrefix()} ${argsToString(args)}`;
      await append("log", message);
    },
    appendInfo: async (...args: any[]): Promise<void> => {
      const message = `${getPrefix()} ${argsToString(args)}`;
      await append("info", message);
    },
    appendDebug: async (...args: any[]): Promise<void> => {
      const message = `${getPrefix()} ${argsToString(args)}`;
      await append("debug", message);
    },

    appendWarn: async (...args: any[]): Promise<void> => {
      const message = `${getPrefix()} ${argsToString(args)}`;
      await append("warn", message);
    },
    appendError: async (...args: any[]): Promise<void> => {
      const message = `${getPrefix()} ${argsToString(args)}`;
      await append("error", message);
    },
  };
})();

const originalLog = console.log;
console.log = function (...args: any[]) {
  ConsoleAPI.appendLog(args);
  originalLog.apply(console, args);
};

const originalInfo = console.info;
console.info = function (...args: any[]) {
  ConsoleAPI.appendInfo(args);
  originalInfo.apply(console, args);
};

const originalDebug = console.debug;
console.debug = function (...args: any[]) {
  ConsoleAPI.appendDebug(args);
  originalDebug.apply(console, args);
};

const originalWarn = console.warn;
console.warn = function (...args: any[]) {
  ConsoleAPI.appendWarn(args);
  originalWarn.apply(console, args);
};

const originalError = console.error;
console.error = function (...args: any[]) {
  ConsoleAPI.appendError(args);
  originalError.apply(console, args);
};

export {};
