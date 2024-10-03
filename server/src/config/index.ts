import dotenv from "dotenv";
import { S3Client } from '@aws-sdk/client-s3';

/**
  @configuring : This code is used to configure CORS options.
*/

const allowedOrigins: string[] = [ "http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://localhost:3001"];

const corsConfig = {
  origin: function (origin: any, callback: any) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

/**  
    @configuring : This code is used to configure the environment variables .en.
*/

const { config } = dotenv;

const dotEnvConfig = () => {
  config({ path: '.env' });
};

/**  
    @configuring : This code is used to configure logs
*/

dotEnvConfig();

const s3Config = new S3Client({
  region: 'eu-north-1',
  credentials:{
     accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
 }
})

const log = console.log;

export { corsConfig, dotEnvConfig, log, s3Config };