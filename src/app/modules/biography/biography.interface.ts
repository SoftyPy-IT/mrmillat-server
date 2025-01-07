export type TItem = {
  _id?: string;
  action?: 'add' | 'update' | 'delete';
  itemTitle: string;
  itemDescription: string;
};

export type TBiography = {
  imageUrl: string;
  title: string;
  shortDescription: string;
  items: TItem[];
};
