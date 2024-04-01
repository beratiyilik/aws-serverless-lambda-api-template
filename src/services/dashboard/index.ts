/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { logError, logInfo } from "utils/log";
import { BadGatewayError } from "../../middy-wrapper/http-errors";
import { BAD_GATEWAY_ERROR } from "../../constants/errors";

export const getDashboard = async (): Promise<any> => {
  try {
    const mockData = {
      stats: [
        {
          name: "Conditions",
          count: "651",
        },
        {
          name: "Symptoms",
          count: "2214",
        },
        {
          name: "Conditionalities",
          count: "526",
        },
      ],
      environments: [
        {
          name: "Production",
          route: "/prod",
        },
        {
          name: "Staging",
          route: "/staging",
        },
        {
          name: "QA",
          route: "/qa",
        },
        {
          name: "Development",
          route: "/development",
        },
      ],
      branches: [
        {
          name: "prod",
        },
        {
          name: "staging",
        },
        {
          name: "qa",
        },
        {
          name: "dev_default",
        },
      ],
    };

    logInfo(JSON.stringify({ mockData }));
    return mockData;
  } catch (error) {
    logError(JSON.stringify(error));
    throw new BadGatewayError(BAD_GATEWAY_ERROR);
  }
};
