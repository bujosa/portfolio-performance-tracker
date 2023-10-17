import { generateISODate } from './generate-iso-date-string.util';

export const updateEntities: any = (data) => {
  const updateData = {};

  const fieldToUpdateList = Object.keys(data);

  for (const field of fieldToUpdateList) {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  }

  updateData['updatedAt'] = generateISODate();

  return updateData;
};
