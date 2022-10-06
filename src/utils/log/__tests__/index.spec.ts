import { logError, logInfo } from "../index";

describe("utils log", () => {
  it("should print info message when give a value", async () => {
    const message = "This is a info message!";
    console.log = jest.fn();
    logInfo(message);
    expect(console.log).toHaveBeenCalledWith(message);
  });

  it("should print error message when give a value", async () => {
    const message = "This is a error message!";
    console.log = jest.fn();
    logError(message);
    expect(console.log).toHaveBeenCalledWith(message);
  });
});
