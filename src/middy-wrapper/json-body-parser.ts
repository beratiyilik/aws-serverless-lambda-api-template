import {
  ExtendedContext,
  ExtendedEvent,
  ExtendedResult,
} from "../types/events";
import { toObject } from "../utils";

const customJsonBodyParser = () => {
  return {
    before: async (handler: {
      event: ExtendedEvent;
      context: ExtendedContext;
      response?: ExtendedResult;
    }) => {
      if (handler.event.headers["Content-Type"] === "application/json") {
        try {
          handler.event.body = toObject(handler.event.body || "");
        } catch (error) {
          console.error("Error parsing JSON body", error);
          throw new Error("Could not parse JSON body");
        }
      }
    },
  };
};

export default customJsonBodyParser;
