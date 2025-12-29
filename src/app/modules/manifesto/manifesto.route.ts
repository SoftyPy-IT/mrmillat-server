// modules/manifesto/manifesto.routes.ts
import { Router } from "express";
import { ManifestoController } from "./manifesto.controller";
import validationRequest from "../../middlewares/validationRequest";
import { ManifestoValidation } from "./manifesto.validation";

const router = Router();

// CRUD routes - Make sure these are correct
router.post(
  "/",
  validationRequest(ManifestoValidation.createManifestoValidationSchema),
  ManifestoController.create
);

router.get("/", ManifestoController.getAll);
router.get("/:id", ManifestoController.getSingle);
router.patch(
  "/:id",
  validationRequest(ManifestoValidation.updateManifestoValidationSchema),
  ManifestoController.update
);
router.delete("/:id", ManifestoController.delete);

export const manifestoRoutes = router;