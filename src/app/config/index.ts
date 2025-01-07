import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  data_base_url: process.env.DATA_BASE_URL,
  bcrypt_solt: process.env.BCRYPT_SOLT,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  access_token_expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refresh_token_expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,

  CORS_ORIGIN_ADMIN: process.env.CORS_ORIGIN_ADMIN,
  CORS_ORIGIN_CLIENT: process.env.CORS_ORIGIN_CLIENT,
};
