import 'dotenv/config';

export const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE || '';
export const MYSQL_USER = process.env.MYSQL_USER || '';
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || '';
export const MYSQL_ROOT_PASSWORD = process.env.MYSQL_ROOT_PASSWORD || '';
export const PMA_HOST = process.env.PMA_HOST || '';
export const API_PORT: number = parseInt(process.env.API_PORT, 10) || 3000;
export const PMA_PORT: number = parseInt(process.env.PMA_PORT, 10) || 3006;
