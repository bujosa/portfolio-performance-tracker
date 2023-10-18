import { generateISODate } from 'src/common/functions/generate-iso-date-string.util';
import { _validateIsoDate } from './iso-date.validator';

describe('IsoDateValidator', () => {
  it('should return false if given an empty string', () => {
    const res = _validateIsoDate('');

    expect(res).toBe(false);
  });

  it.each(['2023-', '2023-13', '2023-02-29', '2023-17-32'])(
    'should return false if given an invalid date = "%s"',
    (value: string) => {
      const res = _validateIsoDate(value);

      expect(res).toBe(false);
    },
  );

  it.each([generateISODate(), '2020-02-29', '2019-03-17', generateISODate()])(
    'should return true if given a valid date = "%s"',
    (value: string) => {
      const res = _validateIsoDate(value);

      expect(res).toBe(true);
    },
  );
});
