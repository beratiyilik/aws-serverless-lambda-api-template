/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { logError, logInfo } from "../../utils";
import { BadGatewayError } from "../../middy-wrapper/http-errors";
import { BAD_GATEWAY_ERROR } from "../../constants/errors";

export default async function (): Promise<any> {
  try {
    const dashboardData = [
      {
        id: 1,
        name: "User Engagement",
        status: "active",
        visits: 150,
        revenue: 420.5,
      },
      {
        id: 2,
        name: "API Requests",
        status: "inactive",
        visits: 90,
        revenue: 210.0,
      },
      {
        id: 3,
        name: "Service Uptime",
        status: "active",
        visits: 200,
        revenue: 560.25,
      },
      {
        id: 4,
        name: "Operational Cost",
        status: "active",
        visits: 300,
        revenue: 620.75,
      },
      {
        id: 5,
        name: "Customer Retention",
        status: "inactive",
        visits: 80,
        revenue: 180.0,
      },
      {
        id: 6,
        name: "Revenue Growth",
        status: "active",
        visits: 450,
        revenue: 780.0,
      },
      {
        id: 7,
        name: "Inventory Levels",
        status: "active",
        visits: 320,
        revenue: 650.3,
      },
      {
        id: 8,
        name: "Customer Feedback",
        status: "inactive",
        visits: 120,
        revenue: 240.0,
      },
      {
        id: 9,
        name: "Market Expansion",
        status: "active",
        visits: 410,
        revenue: 800.1,
      },
      {
        id: 10,
        name: "Production Efficiency",
        status: "active",
        visits: 365,
        revenue: 730.45,
      },
    ];
    logInfo(dashboardData);
    return dashboardData;
  } catch (error) {
    logError(error);
    throw new BadGatewayError(BAD_GATEWAY_ERROR);
  }
}
