export const nearOperationFormatter = (point: [number, number]) => {
  const [longitude, latitude] = point;

  return {
    $near: {
      // Distance is in meters
      $maxDistance: 5000,
      $geometry: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    }
  };
};
