// controllers/manifesto.controller.ts
import { Request, Response } from "express";
import { ManifestoService } from "./manifesto.services";

export const ManifestoController = {
  create: async (req: Request, res: Response): Promise<void> => {
    const result = await ManifestoService.createManifesto(req.body);
    res.status(201).json({ success: true, data: result });
  },

  // In manifesto.controller.ts
getAll: async (req: Request, res: Response): Promise<void> => {
  const { page = 1, limit = 10 } = req.query;
  const data = await ManifestoService.getAllManifestos({ 
    page: Number(page), 
    limit: Number(limit) 
  });
  res.status(200).json({ success: true, data });
},

  getSingle: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const data = await ManifestoService.getManifestoById(id);
    if (!data) {
      res.status(404).json({ success: false, message: "Manifesto not found" });
      return;
    }
    res.status(200).json({ success: true, data });
  },

  update: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const data = await ManifestoService.updateManifesto(id, req.body);
    res.status(200).json({ success: true, data });
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const data = await ManifestoService.deleteManifesto(id);
    res.status(200).json({ success: true, data });
  },
};
