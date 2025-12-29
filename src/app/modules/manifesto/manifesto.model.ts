import { model, Schema } from "mongoose";

export type TManifesto = {
  title: string;
  subtitle?: string;
  description: string;
  shortDescription: string;  
  imageUrl: string;
  pdfLinks?: { name: string; url: string }[];
  keyPoints?: string[];
  date?: Date;
};

const ManifestoSchema = new Schema<TManifesto>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    imageUrl: { type: String, required: true },
    pdfLinks: [
      {
        name: { type: String },
        url: { type: String },
      },
    ],
    keyPoints: [String],
    date: { type: Date },
  },
  { timestamps: true }
);

export const Manifesto = model<TManifesto>("Manifesto", ManifestoSchema);
