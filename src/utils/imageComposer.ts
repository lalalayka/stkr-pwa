import type { ImageItem } from '../types';
import { EXPORT_CONFIG, COLORS, DIMENSIONS } from '../constants/theme';

export async function composeImages(images: ImageItem[]): Promise<Blob> {
  if (images.length === 0) {
    throw new Error('No images to compose');
  }

  const canvas = document.createElement('canvas');
  canvas.width = EXPORT_CONFIG.width;
  canvas.height = EXPORT_CONFIG.height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  // Fill with white background
  ctx.fillStyle = COLORS.background.export;
  ctx.fillRect(0, 0, EXPORT_CONFIG.width, EXPORT_CONFIG.height);

  // Load all images
  const loadedImages = await Promise.all(
    images.map(img => loadImage(img.preview))
  );

  // Gap between images
  const imageGap = EXPORT_CONFIG.imageGap * 6;

  // Calculate scaled dimensions for each image maintaining original aspect ratio
  const scaledDimensions = loadedImages.map(img => {
    // Scale to canvas width while maintaining aspect ratio
    const scale = EXPORT_CONFIG.width / img.width;
    const width = EXPORT_CONFIG.width;
    const height = img.height * scale;
    
    return { width, height };
  });

  // Calculate total height including gaps
  const totalImagesHeight = scaledDimensions.reduce((sum, dim) => sum + dim.height, 0);
  const totalGapsHeight = imageGap * (images.length - 1);
  const totalHeight = totalImagesHeight + totalGapsHeight;

  // Scale down if total height exceeds target
  let scaleFactor = 1;
  let finalGap = imageGap;
  if (totalHeight > EXPORT_CONFIG.height) {
    scaleFactor = EXPORT_CONFIG.height / totalHeight;
    finalGap = imageGap * scaleFactor;
  }

  // Calculate starting Y position to center content vertically
  const finalTotalHeight = (totalImagesHeight * scaleFactor) + (finalGap * (images.length - 1));
  let yOffset = (EXPORT_CONFIG.height - finalTotalHeight) / 2;

  // Draw images vertically, centered
  loadedImages.forEach((img, index) => {
    const finalWidth = scaledDimensions[index].width * scaleFactor;
    const finalHeight = scaledDimensions[index].height * scaleFactor;
    const xOffset = (EXPORT_CONFIG.width - finalWidth) / 2; // Center horizontally
    
    ctx.drawImage(img, xOffset, yOffset, finalWidth, finalHeight);
    yOffset += finalHeight + finalGap;
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob'));
        }
      },
      EXPORT_CONFIG.format,
      EXPORT_CONFIG.quality
    );
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
