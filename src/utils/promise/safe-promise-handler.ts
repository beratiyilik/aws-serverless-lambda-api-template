/*
type SafePromiseHandlerType = <T, Args extends any[]>(
  func: (...args: Args) => Promise<T>,
) => (...funcArgs: Args) => Promise<{ success: boolean; value: T | any }>;

const safePromiseHandler: SafePromiseHandlerType = func => {
  return async (...args) => {
    try {
      const value = await func(...args);
      return { success: true, value };
    } catch (rejectValue) {
      return { success: false, value: rejectValue };
    }
  };
};

export default safePromiseHandler;
*/

export default function <T, Args extends any[]>(
  func: (...args: Args) => Promise<T>
) {
  return async (
    ...args: Args
  ): Promise<{ success: boolean; value: T | any }> => {
    try {
      const value = await func(...args);
      return { success: true, value };
    } catch (rejectValue) {
      return { success: false, value: rejectValue };
    }
  };
}
