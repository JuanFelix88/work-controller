import { resolve } from "path";
import { readFileSync, writeFile, writeFileSync, existsSync } from "fs";

interface DataBaseDefault<T> {
  idProtocol: number;
  data: T[];
}

function json<T>(item: string): T;
function json(item: object): string;
function json<T>(item) {
  if (typeof item === "string") {
    return JSON.parse(item) as T;
  } else {
    return JSON.stringify(item) as string;
  }
}

type Data = {
  id: number;
};

export default class<T, U = T> {
  private path: string = "";
  private beforeCreateFunc: (ojbec: U) => T = (obj) =>
    ({
      id: this.protocol,
      ...obj,
    } as any);

  get protocol(): number {
    return json<DataBaseDefault<T>>(readFileSync(this.path, "utf-8"))
      .idProtocol;
  }

  get data(): T[] {
    return json<DataBaseDefault<T>>(readFileSync(this.path, "utf-8")).data;
  }

  set data(data: T[]) {
    writeFileSync(
      this.path,
      json({
        data,
        idProtocol: data.length === 0 ? 0 : data.length - 1,
      })
    );
  }

  public beforeCreate(func: (object: U) => T): void {
    this.beforeCreateFunc = func;
  }

  public addItem(object: U): T {
    const { idProtocol, data } = json<DataBaseDefault<T>>(
      readFileSync(this.path, "utf-8")
    );

    const objectToInsert = this.beforeCreateFunc(object);

    data.push(objectToInsert);

    writeFileSync(
      this.path,
      json({
        idProtocol: (objectToInsert as any).id,
        data,
      }) as any
    );

    return objectToInsert;
  }

  public definePathData(path: string): void {
    this.path = path;

    if (!existsSync(path)) {
      const defaultData = {
        idProtocol: 0,
        data: [],
      };
      writeFileSync(path, JSON.stringify(defaultData));
    }
  }

  public declarePath(path: string): void {
    path = resolve(path, "data.json");

    this.path = path;

    console.log(this.path);

    if (!existsSync(path)) {
      const defaultData = {
        idProtocol: 0,
        data: [],
      };
      writeFileSync(path, JSON.stringify(defaultData));
    } else {
      const file = readFileSync(this.path, "utf-8");

      const { idProtocol } = json<any>(file);

      if (!idProtocol) {
        const defaultData = {
          idProtocol: 0,
          data: [],
        };
        writeFileSync(path, JSON.stringify(defaultData));
      }
    }
  }
}
