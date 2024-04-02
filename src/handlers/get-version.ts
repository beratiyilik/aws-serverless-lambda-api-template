import { Lambda } from "../types/events";
import { lambdaMiddyWrapper } from "../middy-wrapper";
import Response from "middy-wrapper/http-responses";

const get = async (): Promise<any> => {
  return {
    timeStamp: Date.now(),
    commitShortSha: process.env.GIT_COMMIT_SHORT,
    commitSha: process.env.GIT_COMMIT_LONG,
    branch: process.env.GIT_BRANCH,
    isDirty: process.env.GIT_IS_DIRTY,
    tag: process.env.GIT_TAG,
    tags: process.env.GIT_TAGS,
    /*
    authorName: process.env.GIT_AUTHOR_NAME,
    authorEmail: process.env.GIT_AUTHOR_EMAIL,
    committerName: process.env.GIT_COMMITTER_NAME,
    committerEmail: process.env.GIT_COMMITTER_EMAIL,
    */
    messageSubject: process.env.GIT_MESSAGE_SUBJECT,
    messageBody: process.env.GIT_MESSAGE_BODY,
  };
};

const lambda: Lambda = async (): Promise<any> => {
  const version = await get();
  return Response.Ok(version);
};

export const getVersion = lambdaMiddyWrapper({
  lambda,
});
