/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url:'postgresql://neondb_owner:j5QnFi2xKAyR@ep-odd-glitter-a5w61sdc.us-east-2.aws.neon.tech/neondb?sslmode=require' ,
    }
  };