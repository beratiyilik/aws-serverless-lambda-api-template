import { APIGatewayEventRequestContext, Context } from "aws-lambda";

export const buildMockContext = (): Context => ({
  callbackWaitsForEmptyEventLoop: false,
  functionName: "some-function-name",
  functionVersion: "some-function-version",
  invokedFunctionArn: "some-invoked-function-arn",
  memoryLimitInMB: "123",
  awsRequestId: "some-aws-request-id",
  logGroupName: "some-log-group-name",
  logStreamName: "some-log-stream-name",
  getRemainingTimeInMillis: (): number => 123,
  done: (): void => {
    return;
  },
  fail: (): void => {
    return;
  },
  succeed: (): void => {
    return;
  },
});

export const buildApiGatewayEventRequestContext = (
  stage = ""
): APIGatewayEventRequestContext => ({
  accountId: "",
  apiId: "",
  authorizer: null,
  httpMethod: "",
  protocol: "",
  identity: {
    clientCert: null,
    principalOrgId: "",
    accessKey: "",
    accountId: "",
    apiKey: "",
    apiKeyId: "",
    caller: "",
    cognitoAuthenticationProvider: "",
    cognitoAuthenticationType: "",
    cognitoIdentityId: "",
    cognitoIdentityPoolId: "",
    sourceIp: "",
    user: "",
    userAgent: "",
    userArn: "",
  },
  messageId: null,
  path: "",
  stage,
  requestId: "",
  requestTimeEpoch: 0,
  resourceId: "",
  resourcePath: "",
});
