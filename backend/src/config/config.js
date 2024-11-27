import dotenv from "dotenv";
dotenv.config();

export const app = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
};

export const db = {
  uri:
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_URI
      : process.env.MONGO_URI_TEST,
};

export const jwt = {
  secret: process.env.JWT_SECRET || "secret",
  expiration: "1h",
};
