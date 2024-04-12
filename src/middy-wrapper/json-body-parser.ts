import { logError } from "../utils";
import {
  ExtendedContext,
  ExtendedEvent,
  ExtendedResult,
} from "../types/events";

const customJsonBodyParser = () => {
  return {
    before: async (handler: {
      event: ExtendedEvent;
      context: ExtendedContext;
      response?: ExtendedResult;
    }) => {
      if (handler.event.headers["Content-Type"] === "application/json") {
        try {
          handler.event.body = (handler.event.body || "").toObject();
        } catch (error) {
          logError("Error parsing JSON body", error);
          throw new Error("Could not parse JSON body");
        }
      }
    },
  };
};

export default customJsonBodyParser;
