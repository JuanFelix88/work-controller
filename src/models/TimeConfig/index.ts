import Model from "../../utils/Model";

export interface Data {
  initialHour: string;
  initialInterval: string;
  returnInterval: string;
  exit: string;
}

class Record extends Model<Data> {
  constructor() {
    super();

    this.beforeCreate((objc) => objc);

    this.declarePath(__dirname);
  }

  public defineSchema(data: Data): void {
    this.data = [data];
  }

  public getSchema(): Data {
    return this.data[0];
  }
}

export default new Record();
