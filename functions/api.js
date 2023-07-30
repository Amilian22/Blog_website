import Serverless from "serverless-http";
import app from "../index.js";


export const handler = Serverless(app);



