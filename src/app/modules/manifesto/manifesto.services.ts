// services/manifesto.services.ts

import { Manifesto, TManifesto } from "./manifesto.model";

export const ManifestoService = {
  createManifesto: async (payload: TManifesto) => {
    return await Manifesto.create(payload);
  },

  // In manifesto.services.ts
getAllManifestos: async (query: { page?: number; limit?: number }) => {
  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;
  
  const [data, total] = await Promise.all([
    Manifesto.find().sort({ date: -1 }).skip(skip).limit(limit),
    Manifesto.countDocuments()
  ]);
  
  return {
    data,
    totalCount: total,
    page,
    limit
  };
},

  getManifestoById: async (id: string) => {
    return await Manifesto.findById(id);
  },

  updateManifesto: async (id: string, payload: Partial<TManifesto>) => {
    return await Manifesto.findByIdAndUpdate(id, payload, { new: true });
  },

  deleteManifesto: async (id: string) => {
    return await Manifesto.findByIdAndDelete(id);
  },
};
