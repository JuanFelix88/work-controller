import express from "express";
import routes from "./routes";

const app = express();

app.use(routes);

app.listen(process.env.PORT || 3000);
