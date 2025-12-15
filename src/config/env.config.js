import dotenv from "dotenv"

dotenv.config()

export const env = {
    PORT: process.env.PORT,
    CLIENT_URL: process.env.CLIENT_URL,
  };