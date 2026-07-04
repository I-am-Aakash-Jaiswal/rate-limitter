import dotenv from "dotenv";

const env = process.env.NODE_ENV || "development";



dotenv.config({
  path: `.env.${env}`,
});

export const config = {
  redis: {
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME!,
    password: process.env.REDIS_PASSWORD!,
  },
};