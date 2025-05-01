import sharp from 'sharp';
import { getPlaiceholder } from 'plaiceholder';

interface ImageMetadata {
  width: number;
  height: number;
  blurDataUrl?: string;
  dominantColor?: string;
  format: string;
}

export async function getImageMetadata(imagePath: string): Promise<ImageMetadata> {
  try {
    const imageBuffer = await sharp(imagePath).toBuffer();
    const metadata = await sharp(imageBuffer).metadata();
    const { base64: blurDataUrl } = await getPlaiceholder(imageBuffer);
    
    // Get dominant color
    const { dominant } = await sharp(imageBuffer)
      .stats()
      .then(({ dominant }) => ({ dominant }));

    return {
      width: metadata.width || 0,
      height: metadata.height || 0,
      format: metadata.format || 'unknown',
      blurDataUrl,
      dominantColor: `rgb(${dominant.r}, ${dominant.g}, ${dominant.b})`,
    };
  } catch (error) {
    console.error('Error getting image metadata:', error);
    return {
      width: 0,
      height: 0,
      format: 'unknown',
    };
  }
}

export function generateImageSrcSet(
  src: string,
  widths: number[] = [640, 750, 828, 1080, 1200, 1920, 2048]
): string {
  return widths
    .map(width => `${src}?w=${width} ${width}w`)
    .join(', ');
}

export function generateImageSizes(
  defaultSize: string = '100vw',
  breakpoints: { [key: string]: string } = {
    '(max-width: 640px)': '100vw',
    '(max-width: 1024px)': '50vw',
    '(max-width: 1536px)': '33vw',
  }
): string {
  return Object.entries(breakpoints)
    .map(([breakpoint, size]) => `${breakpoint} ${size}`)
    .concat(defaultSize)
    .join(', ');
}

export function generateAltText(
  imagePath: string,
  fallback: string = ''
): string {
  if (!imagePath) return fallback;
  
  // Extract meaningful text from image path
  const fileName = imagePath.split('/').pop() || '';
  const nameWithoutExtension = fileName.split('.')[0];
  
  // Convert kebab/snake case to readable text
  const readableName = nameWithoutExtension
    .replace(/[-_]/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, l => l.toUpperCase());
  
  return readableName || fallback;
}

export function getImageSchema(
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  },
  context: {
    url: string;
    title?: string;
    description?: string;
    license?: string;
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: image.src,
    url: context.url,
    width: image.width,
    height: image.height,
    caption: image.alt,
    name: context.title || image.alt,
    description: context.description || image.alt,
    license: context.license || 'https://creativecommons.org/licenses/by/4.0/',
  };
}