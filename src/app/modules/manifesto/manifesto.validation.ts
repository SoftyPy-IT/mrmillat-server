import { z } from "zod";

const createManifestoValidationSchema = z.object({
  body: z.object({
    title: z.string({ invalid_type_error: "title must be a string" }),
    shortDescription: z.string({ invalid_type_error: "shortDescription must be a string" }),
    description: z.string({ invalid_type_error: "description must be a string" }),
    date: z.string({ invalid_type_error: "date must be a string" }), // parse as Date later
    imageUrl: z.string({ invalid_type_error: "imageUrl must be a string" }),
    pdfLinks: z
      .array(
        z.object({
          name: z.string({ invalid_type_error: "PDF name must be a string" }),
          url: z.string({ invalid_type_error: "PDF url must be a string" }),
        })
      )
      .optional(),
  }),
});

const updateManifestoValidationSchema = z.object({
  body: z.object({
    title: z.string({ invalid_type_error: "title must be a string" }).optional(),
    shortDescription: z.string({ invalid_type_error: "shortDescription must be a string" }).optional(),
    description: z.string({ invalid_type_error: "description must be a string" }).optional(),
    date: z.string({ invalid_type_error: "date must be a string" }).optional(),
    imageUrl: z.string({ invalid_type_error: "imageUrl must be a string" }).optional(),
    pdfLinks: z
      .array(
        z.object({
          name: z.string({ invalid_type_error: "PDF name must be a string" }),
          url: z.string({ invalid_type_error: "PDF url must be a string" }),
        })
      )
      .optional(),
  }),
});

export const ManifestoValidation = {
  createManifestoValidationSchema,
  updateManifestoValidationSchema,
};
