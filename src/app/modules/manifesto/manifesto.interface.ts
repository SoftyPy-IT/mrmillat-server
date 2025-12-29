export type TPlan = {
  imageUrl: string;
  title: string;
  shortDescription: string;
  description: string;
  date: Date;
  pdfLinks?: { name: string; url: string }[];
};
