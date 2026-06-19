// sharp is a Node.js-only library and cannot run in the browser.
// optimizeImage is not used anywhere in the frontend — left as a no-op stub.
export const optimizeImage = async () => false;

export const generateImageSrcSet = (imagePath) => {
  const sizes = [320, 640, 960, 1280];
  return sizes
    .map(size => `${imagePath}?w=${size} ${size}w`)
    .join(', ');
};
