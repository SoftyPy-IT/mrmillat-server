import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV:process.env.NODE_ENV,
  port: process.env.PORT,
  data_base_url: process.env.DATA_BASE_URL,
  bcrypt_solt:process.env.BCRYPT_SOLT,
  access_token_secret:process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret:process.env.REFRESH_TOKEN_SECRET,
  access_token_expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN,
  refresh_token_expiresIn:process.env.REFRESH_TOKEN_EXPIRES_IN
};
