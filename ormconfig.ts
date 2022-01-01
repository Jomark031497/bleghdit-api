const prodConfig = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

const devConfig = {
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  logging: process.env.NODE_ENV === "development",
  entities: ["dist/entities/**/*.js"],
  migrations: ["dist/migrations/**/*.js"],
  subscribers: ["dist/subscribers/**/*.js"],
  seeds: ["dist/seeds/**/*{.ts,.js}"],
  cli: {
    entitiesDir: "dist/entities",
    migrationsDir: "dist/migrations",
    subscribersDir: "dist/subscriber",
  },
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

module.exports = config;
