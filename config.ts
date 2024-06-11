import 'dotenv/config';

export const MYSQL_DATABASE = process.env.MYSQL_DATABASE || '';
export const MYSQL_USER = process.env.MYSQL_USER || '';
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || '';
export const MYSQL_ROOT_PASSWORD = process.env.MYSQL_ROOT_PASSWORD || '';
export const PMA_HOST = process.env.PMA_HOST || '';
export const API_PORT = process.env.API_PORT || 3000;
export const PMA_PORT = process.env.PMA_PORT || 3006;
