import { Request, Response } from "express";
import { Days } from "./DaysControllers";
import record from "../models/Record";

const awaiter = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export default {
  async index(req: Request, res: Response) {
    try {
      res.json(record.data);
    } catch (error) {
      console.error(error);
      res.status(400).send();
    }
  },
  async store(req: Request, res: Response) {
    try {
      await awaiter(300);
      const item = record.addItem({} as any);

      const items = record.data;
      const days: Days = [];

      items.forEach((item) => {
        console.log(item);

        const testDay = days.find(({ date }) => date === item.date);

        !testDay
          ? days.push({
              date: item.date,
              id: days.length,
              records: [item.recordAt],
              state: "incomplete",
            })
          : days[testDay.id].records.push(item.recordAt);
      });

      res.status(201).json(item);
    } catch (error) {
      console.error(error);
      res.status(400).send();
    }
  },
};
