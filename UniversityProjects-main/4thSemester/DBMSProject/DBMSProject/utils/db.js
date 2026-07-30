import { neon } from '@neondatabase/serverless';

export const SQL = neon(process.env.DATABASE_URL);