import { TBiography } from './biography.interface';
import { Biography } from './biography.model';

const getAllBiographyFromDB = async () => {
  const result = await Biography.find();
  return result[0];
};

const updateBiographyFromDB = async (
  id: string,
  payload: Partial<TBiography>,
) => {
  const { items = [], ...basicData } = payload;
  const item = items[0];
  if (item?.action === 'add') {
    await Biography.findByIdAndUpdate(
      id,
      {
        $addToSet: { items: item },
      },
      { new: true },
    );
  }
  if (item?.action === 'delete') {
    await Biography.findByIdAndUpdate(
      id,
      {
        $pull: { items: { _id: item._id } },
      },
      { new: true },
    );
  }
  if (item?.action === 'update') {
    const result = await Biography.findOneAndUpdate(
      {
        _id: id, // Ensure you are matching the correct document
        'items._id': item._id, // Match the specific item in the array using its `_id`
      },
      {
        $set: {
          'items.$.itemTitle': item.itemTitle,
          'items.$.itemDescription': item.itemDescription,
        },
      },
      { new: true }, // Return the updated document
    );

    if (!result) {
      throw new Error('Item not found or update failed');
    }
  }

  const result = await Biography.findByIdAndUpdate(id, basicData, {
    new: true,
  });

  return result;
};

export const BiographyServices = {
  getAllBiographyFromDB,
  updateBiographyFromDB,
};
