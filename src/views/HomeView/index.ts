import { Request, Response } from "express";
import { readFileSync } from "fs";
import { resolve } from "path";
import Viewer from "../../utils/viewer";
import { transform } from "sucrase";

export default {
  index(req: Request, res: Response) {
    const viewer = new Viewer();
    viewer.includeViewByPath(__dirname);

    viewer.sendHtml(res);
  },
};
