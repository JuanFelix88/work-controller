import { Request, Response } from "express";
import { readFileSync } from "fs";
import { resolve } from "path";

interface StaticsRequests extends Request {
  params: {
    file: string;
  };
}

export default {
  index(req: StaticsRequests, res: Response) {
    const { file } = req.params;

    if (!file) res.status(400).send();

    const textFile = readFileSync(
      resolve(__dirname, "..", "static", file),
      "utf-8"
    );

    const typeFile = file.replace(/^\D*\./, "");

    console.log(
      typeFile,
      ":",
      "content-type",
      typeFile === "css"
        ? "text/css"
        : typeFile === "html"
        ? "text/html"
        : typeFile === "map"
        ? "text/json"
        : "text"
    );

    res
      .set(
        "content-type",
        typeFile === "css"
          ? "text/css"
          : typeFile === "html"
          ? "text/html"
          : typeFile === "map"
          ? "text/json"
          : "text"
      )
      .send(textFile);
  },
};
