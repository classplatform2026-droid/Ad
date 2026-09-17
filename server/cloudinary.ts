import { v2 as cloudinary } from 'cloudinary';

let isConfigured = false;

export function getCloudinaryClient() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return null;
  }

  if (!isConfigured) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
    isConfigured = true;
  }

  return cloudinary;
}

export function getCloudinaryStatus() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const configured = Boolean(cloudName && apiKey && apiSecret);
  return {
    configured,
    cloudName: cloudName ? cloudName.substring(0, 3) + '***' : null,
    message: configured
      ? 'Cloudinary is configured and ready for uploads.'
      : 'Cloudinary credentials missing. Configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in Settings > Secrets.',
  };
}

export async function uploadToCloudinary(
  fileData: string,
  folder: string = 'kasab_gallery'
): Promise<{ url: string; public_id: string }> {
  const client = getCloudinaryClient();
  if (!client) {
    throw new Error(
      'Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in Settings > Secrets.'
    );
  }

  const result = await client.uploader.upload(fileData, {
    folder: `kasab_gallery/${folder}`,
    resource_type: 'auto',
    transformation: [
      { quality: 'auto', fetch_format: 'auto' },
    ],
  });

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
}

export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  const client = getCloudinaryClient();
  if (!client) {
    return false;
  }

  try {
    await client.uploader.destroy(publicId);
    return true;
  } catch (err) {
    console.error('[Cloudinary] Delete error:', err);
    return false;
  }
}
