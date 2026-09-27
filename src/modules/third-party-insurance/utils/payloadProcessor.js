import { reconstructFile } from "./fileUtils";
import { compressImage } from "./imageUtils";

const MAX_SIZE = 0.7 * 1024 * 1024;

function shouldCompress(file) {
  if (!(file instanceof File)) return false;

  // فایل‌های غیرتصویری فشرده نشوند
  if (!file.type.startsWith("image/")) return false;

  // GIF و SVG پردازش نشوند
  if (file.type === "image/gif" || file.type === "image/svg+xml") {
    return false;
  }

  // فایل کوچک دوباره فشرده نشود
  if (file.size <= MAX_SIZE) return false;

  return true;
}

async function processEntry(entry) {
  const file = reconstructFile(entry);

  if (shouldCompress(file)) {
    console.log(`شروع فشرده‌سازی: ${file.name}`);
    const compressed = await compressImage(file);
    console.log(`پایان فشرده‌سازی: ${file.name}`);
    return compressed;
  }

  return file || entry;
}

export async function processPayload(data) {
  console.log("PROCESS PAYLOAD START", data);

  const processed = { ...data };

  if (processed.first_name || processed.last_name) {
    processed.full_name =
      `${processed.first_name || ""} ${processed.last_name || ""}`.trim();

    delete processed.first_name;
    delete processed.last_name;
  }

  for (const key in processed) {
    if (!Object.prototype.hasOwnProperty.call(processed, key)) {
      continue;
    }

    const item = processed[key];

    if (Array.isArray(item)) {
      // تصاویر به‌صورت موازی پردازش می‌شوند
      processed[key] = await Promise.all(item.map(processEntry));
    } else {
      processed[key] = await processEntry(item);
    }
  }

  return processed;
}
