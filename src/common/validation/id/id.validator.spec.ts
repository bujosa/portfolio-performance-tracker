import { generateISODate } from 'src/common/functions/generate-iso-date-string.util';
import { _validateId } from './id.validator';
import { generateId } from 'src/common/functions/generate-id.util';

describe('ValidateID', () => {
  it('should return false if given null', () => {
    const res = _validateId(null);

    expect(res).toBe(false);
  });

  it('should return false if given undefined', () => {
    const res = _validateId(undefined);

    expect(res).toBe(false);
  });

  it('should return false if given an empty string', () => {
    const res = _validateId('');

    expect(res).toBe(false);
  });

  it.each([['a'], ['qwertyuiopasdfghjklzxcvbnm'], [{ slug: 'henlo' }]])(
    'should return false if given an invalid ID = "%s"',
    (val) => {
      const res = _validateId(val);

      expect(res).toBe(false);
    },
  );

  it.each([[new Date()], [Date.now()], [generateISODate()]])(
    'should return false if given a date = "%s"',
    (val) => {
      const res = _validateId(<string>val);

      expect(res).toBe(false);
    },
  );

  it.each([[generateId(), generateId()]])(
    'should return true if given a valid Id = "%s"',
    (val) => {
      const res = _validateId(val);

      expect(res).toBe(true);
    },
  );
});
