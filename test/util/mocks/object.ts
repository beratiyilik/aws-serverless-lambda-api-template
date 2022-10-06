/* eslint-disable @typescript-eslint/no-explicit-any */
export const mockMappedKeyValueProps = new Map([
  ["key1", "value 1"],
  ["key2", "value 2"],
]);

export const mockObject = {
  key1: "value 1",
  key2: "value 2",
};

export const mockMappedKeyValuePropsUndefined:
  | Iterable<readonly [PropertyKey, any]>
  | undefined = undefined;
