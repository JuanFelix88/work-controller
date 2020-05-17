import { Request, Response } from "express";

import records from "../models/Record";

interface StaticsRequests extends Request {
  params: {
    file: string;
  };
}

export type Days = {
  id: number;
  state: "incomplete" | "full";
  date: string;
  records: string[];
}[];

export default {
  index(req: StaticsRequests, res: Response) {
    try {
      const items = records.data;
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

      res.json(
        days.map(({ date, state, id, records }) => ({
          date,
          id,
          records,
          state: records.length === 4 ? "full" : "incomplete",
        })) as Days
      );
    } catch (error) {
      console.error(error);
      res.status(400).send();
    }
  },
};
