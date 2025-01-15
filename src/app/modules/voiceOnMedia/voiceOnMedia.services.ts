import QueryBuilder from '../../builders/QueryBuilder';
import { TVoiceOnMedia } from './voiceOnMedia.interface';
import { VoiceOnMedia } from './voiceOnMedia.model';

const createVoiceOnMediaIntoDB = async (payload: TVoiceOnMedia) => {
  const result = await VoiceOnMedia.create(payload);
  return result;
};

const getAllVoiceOnMediaFromDB = async (query: Record<string, unknown>) => {
  const VoiceOnMediaQuery = new QueryBuilder(
    VoiceOnMedia.find(),
    query,
  ).paginate().sort();
  const data = await VoiceOnMediaQuery.modelQuery;
  const totalCount = await VoiceOnMedia.countDocuments();
  const result = { data, totalCount };
  return result;
};

const getSingleVoiceOnMediaFromDB = async (id: string) => {
  const result = await VoiceOnMedia.findById(id);
  return result;
};

const updateVoiceOnMediaFromDB = async (
  id: string,
  payload: Partial<TVoiceOnMedia>,
) => {
  const updatedTitle = payload?.title;
  const updatedVideoUrl = payload?.videoUrl;
  const thisVoiceOnMedia = await VoiceOnMedia.findById(id);
  const isExistTitleVoiceOnMedia = await VoiceOnMedia.findOne({
    title: updatedTitle,
  });
  const isExistVideoUrlVoiceOnMedia = await VoiceOnMedia.findOne({
    videoUrl: updatedVideoUrl,
  });

  if (
    (isExistVideoUrlVoiceOnMedia &&
      thisVoiceOnMedia?.videoUrl !== updatedVideoUrl) ||
    (isExistTitleVoiceOnMedia && thisVoiceOnMedia?.title !== updatedTitle)
  ) {
    throw new Error('The Media is already exist! please choose another one.');
  }
  const result = await VoiceOnMedia.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteVoiceOnMediaFromDB = async (id: string) => {
  const result = await VoiceOnMedia.findByIdAndDelete(id);
  return result;
};

export const VoiceOnMediaServices = {
  createVoiceOnMediaIntoDB,
  getAllVoiceOnMediaFromDB,
  getSingleVoiceOnMediaFromDB,
  updateVoiceOnMediaFromDB,
  deleteVoiceOnMediaFromDB,
};
