import { Router } from "express";
import StaticsController from "./controllers/StaticsControllers";
import DaysController from "./controllers/DaysControllers";
import RecordController from "./controllers/RecordController";
import SchemaController from "./controllers/SchemaController";
import { json } from "express";
import HomeView from "./views/HomeView";

const router = Router();

router.get("/static/:file", StaticsController.index);
router.get("/", HomeView.index);

router.use(json());
router.post("/api/schema", SchemaController.store);
router.get("/api/days", DaysController.index);
router.get("/api/records", RecordController.index);
router.post("/api/records", RecordController.store);
router.get("/api/schema", SchemaController.index);

export default router;
