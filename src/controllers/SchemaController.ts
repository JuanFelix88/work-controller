import { Request, Response } from "express";
import timerConfig, { Data } from "../models/TimeConfig";

export { Data as TimerConfig } from "../models/TimeConfig";

interface StoreRequest extends Request {
  body: Data;
}

export default {
  async index(req: Request, res: Response) {
    try {
      res.json(timerConfig.getSchema());
    } catch (error) {
      console.error(error);
      res.status(400).send();
    }
  },
  async store(req: StoreRequest, res: Response) {
    const { exit, initialHour, initialInterval, returnInterval } = req.body;

    timerConfig.defineSchema({
      exit,
      initialHour,
      initialInterval,
      returnInterval,
    });

    res.json(timerConfig.getSchema());
    try {
    } catch (error) {
      console.error(error);
      res.status(400).send();
    }
  },
};
