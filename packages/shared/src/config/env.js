import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../');
dotenv.config({ path: path.join(packageRoot, '.env') });

export const env = {
  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT || 5432),
    database: process.env.POSTGRES_DB || 'horary',
    user: process.env.POSTGRES_USER || 'horary',
    password: process.env.POSTGRES_PASSWORD || 'horary_secret',
  },
};
