const log = (...params: any[]): void => console.log(...params);
const logError = (...params: any[]): void => console.error(...params);
const logInfo = (...params: any[]): void => console.info(...params);
const logWarn = (...params: any[]): void => console.warn(...params);
const logDebug = (...params: any[]): void => console.debug(...params);

export { log, logError, logInfo, logWarn, logDebug };
