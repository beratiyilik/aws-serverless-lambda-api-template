/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { ExtendedEvent } from "../types/Events";
import { lambdaMiddyWrapper } from "../middyWrapper";
import { getDashboard as get } from "../services/dashboard";

export const lambda = async ({}: ExtendedEvent): Promise<any[]> => get();

export const getDashboard = lambdaMiddyWrapper({
  lambda,
});
