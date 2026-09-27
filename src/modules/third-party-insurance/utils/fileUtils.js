export const isStableFile = (value) =>
  value &&
  value.buffer instanceof ArrayBuffer &&
  typeof value.name === "string" &&
  typeof value.type === "string";

export const reconstructFile = (value) => {
  if (!value) return "";
  if (value instanceof File) return value;
  if (isStableFile(value)) {
    return new File([value.buffer], value.name, {
      type: value.type,
      lastModified: value.lastModified || Date.now(),
    });
  }
  return value;
};
