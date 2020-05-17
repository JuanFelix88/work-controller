import { resolve } from "path";
import { readFileSync } from "fs";
import { Response } from "express";
import { transform } from "sucrase";

export default class {
  private view?: string;

  public includeViewByPath(path: string) {
    const text = readFileSync(resolve(path, "index.html"), "utf-8");
    const script = readFileSync(resolve(path, "script.ts"), "utf-8");
    const template = readFileSync(
      resolve(__dirname, "..", "static", "main.html"),
      "utf-8"
    );
    const parserText = "%%||====||%%";

    const scriptParsed = `<script>${
      transform(script, {
        transforms: ["typescript", "imports"],
      }).code
    }</script>`;

    this.view = template.split(parserText).join(text + scriptParsed);

    return this;
  }

  public sendHtml(res: Response): void {
    res.set("content-type", "text/html").send(this.view);
  }
}
