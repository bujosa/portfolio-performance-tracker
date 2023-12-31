import { updateEntities } from './update-entities';

describe('Update entities', () => {
  it('returns an object with an updatedAt field if the object given as input has no fields', () => {
    const data = {};

    const updateObject = updateEntities(data);

    expect(updateObject.updatedAt).not.toBeNull();
    expect(updateObject.updatedAt).not.toBeUndefined();
  });

  it('returns an object that does not have undefined or null fields', () => {
    const cargoValue = 20;

    const data = {
      title: undefined,
      price: null,
      cargo: cargoValue,
    };

    const updatedObject = updateEntities(data);

    expect(updatedObject.cargo).toEqual(cargoValue);
    expect(updatedObject.title).toBeUndefined();
    expect(updatedObject.price).toBeNull();
  });

  it('returns an object with the value and check if are not undefined or null', () => {
    const amountValue = 20;
    const isSoldValue = false;
    const discountValue = 0;

    const data = {
      isSold: isSoldValue,
      discount: discountValue,
      amount: amountValue,
    };

    const updatedObject = updateEntities(data);

    expect(updatedObject.amount).toEqual(amountValue);
    expect(updatedObject.isSold).toEqual(isSoldValue);
    expect(updatedObject.discount).toEqual(discountValue);
  });
});
