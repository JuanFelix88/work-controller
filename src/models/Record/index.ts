import Model from "../../utils/Model";

const getDate = () =>
  new Date(new Date().valueOf() - new Date().getTimezoneOffset() * 60000);

export interface Data {
  id: number;
  date: string;
  recordAt: string;
}

class Record extends Model<Data> {
  constructor() {
    super();

    this.beforeCreate(() => {
      const today = getDate().toISOString().split("T")[0];
      const hour = getDate().toISOString().split("T")[1].substr(0, 5);

      const amountItems = this.data.filter(({ date }) => today === date).length;

      const existsEqual = !!this.data.find(({ date, recordAt }) => {
        const minute = 60000;
        const tenMinutesPositive = minute * 10;
        const tenMinutesNegative = -1 * tenMinutesPositive;
        const difference =
          new Date(`${date}T${recordAt}`).getTime() -
          new Date(`${today}T${hour}`).getTime();

        console.log("diferença:", difference);

        return (
          difference >= tenMinutesNegative && difference <= tenMinutesPositive
        );
      });

      if (amountItems >= 4 || existsEqual)
        throw new Error("Register not allowed");

      return {
        id: this.protocol + 1,
        date: today,
        recordAt: hour,
      };
    });

    this.declarePath(__dirname);
  }

  public findById(idSearch: number): Data | null {
    return this.data.find(({ id }) => idSearch === id);
  }
}

export default new Record();
