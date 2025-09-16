import sharp from 'sharp';

export const optimizeImage = async (inputPath, outputPath, options = {}) => {
  const {
    width = 800,
    quality = 80,
    format = 'webp'
  } = options;

  try {
    await sharp(inputPath)
      .resize(width)
      .webp({ quality })
      .toFile(outputPath);
    return true;
  } catch (error) {
    console.error('Image optimization failed:', error);
    return false;
  }
};

export const generateImageSrcSet = (imagePath) => {
  const sizes = [320, 640, 960, 1280];
  return sizes
    .map(size => `${imagePath}?w=${size} ${size}w`)
    .join(', ');
};