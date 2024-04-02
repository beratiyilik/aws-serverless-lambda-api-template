/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { EventWithBody, Lambda } from "../types/events";
import { lambdaMiddyWrapper } from "../middy-wrapper";
import { getDashboard as get } from "../services/dashboard";
import Response from "middy-wrapper/http-responses";

const lambda: Lambda = async (event: EventWithBody): Promise<any> => {
  const dashboard = await get();
  return dashboard ? Response.Ok(dashboard) : Response.NotFound();
};

export const getDashboard = lambdaMiddyWrapper({
  lambda,
});
