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
          handler.event.body = Utils.toObject(handler.event.body || "");
        } catch (error) {
          Utils.logError("Error parsing JSON body", error);
          throw new Error("Could not parse JSON body");
        }
      }
    },
  };
};

export default customJsonBodyParser;
