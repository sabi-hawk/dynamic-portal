
import { Request, Response } from "express";
import _ from "lodash";
import { __DEBUG__ } from "../../config/app";
import winston from 'winston';
import path from 'path';

const Logger = winston.createLogger({
  level: 'debug', // Set the log level as needed
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: path.join(__dirname, '..', '..', "..", 'logs', 'index.txt') }),
    // Add more transports as needed (e.g., file transport)
  ],
});

// console.log("PATH IS:", path.join(__dirname, '..', '..', "..", 'logs', 'index.txt'))
type HttpMethod = (req: Request, res: Response) => Promise<any>;

export function httpMethod(method: HttpMethod): HttpMethod {
  return async (req: Request, res: Response) => {
    const methodName = `${req.method} : ${req.originalUrl}`;
    try {
      Logger.debug(
        `Http Request | Start: ${methodName}`,
        JSON.stringify(_.merge(req.body, req.params, req.query), null, 2)
      );
      const resp = await method(req, res);

      Logger.debug(`Http Request | Complete: ${methodName}`, JSON.stringify(resp, null, 2));
    } catch (e: any) {
      Logger.debug(
        `Http Request | Error: ${methodName}`,
        e.message,
        JSON.stringify(e.data, null, 2)
      );
      res.status(e.status || 500).json({
        ...e.data,
        status: undefined,
        message: e.message,
        stack: __DEBUG__ ? e.stack : undefined,
      });
    }
  };
}