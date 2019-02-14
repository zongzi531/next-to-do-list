export const ENVIRONMENT = process.env.NODE_ENV;

const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'

// export const MONGODB_URI = prod ? process.env['MONGODB_URI'] : process.env['MONGODB_URI_LOCAL'];
export const MONGODB_URI = prod ? process.env['MONGODB_URI'] : 'mongodb://localhost:27017/todo';

if (!MONGODB_URI) {
  console.error('No mongo connection string. Set MONGODB_URI environment variable.');
  process.exit(1);
}
