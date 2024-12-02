import dotenv from "dotenv";
dotenv.config();

const app = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
};

const db = {
  uri:
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_URI
      : process.env.MONGO_URI_TEST,
};

const jwt = {
  secret: process.env.JWT_SECRET,
  expiration: process.env.JWT_EXPIRATION,
};

const email = {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
};

export {
  app as appConfig,
  db as dbConfig,
  jwt as jwtConfig,
  email as emailConfig,
};
