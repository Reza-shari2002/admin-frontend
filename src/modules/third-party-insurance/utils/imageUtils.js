import imageCompression from "browser-image-compression";

export const compressImage = async (file) => {
  console.time(`compress-${file.name}`);

  try {
    const result = await imageCompression(file, {
      maxSizeMB: 0.7,
      maxWidthOrHeight: 1600,
      initialQuality: 0.75,
      useWebWorker: true,

      onProgress: (progress) => {
        console.log(`${file.name}: ${progress}%`);
      },
    });

    console.log("Compression:", {
      name: file.name,
      before: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      after: `${(result.size / 1024 / 1024).toFixed(2)} MB`,
    });

    return result;
  } finally {
    console.timeEnd(`compress-${file.name}`);
  }
};
