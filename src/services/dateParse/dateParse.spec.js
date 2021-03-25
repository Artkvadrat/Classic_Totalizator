import parseDate from './dateParse';

describe('parseDate test', () => {
  it('should handle not valid input', () => {
    expect(parseDate(null)).toEqual('');
    expect(parseDate(0)).toEqual('');
    expect(parseDate(42)).toEqual('');
    expect(parseDate(-Infinity)).toEqual('');
    expect(parseDate([])).toEqual('');
    expect(parseDate(false)).toEqual('');
    expect(parseDate(undefined)).toEqual('');
    expect(parseDate('string')).toEqual('');
    expect(parseDate(true)).toEqual('');
    expect(parseDate({})).toEqual('');
    expect(parseDate({ a: 'b' })).toEqual('');
    expect(parseDate('2021-03-32')).toEqual('');
    expect(parseDate('2021-11-2511:12:32.911Z')).toEqual('');
  });

  it('should provide correct format', () => {
    expect(parseDate('2021-11-25T11:12:32.911Z').length).toEqual(16);
    expect(parseDate('2018-10-24T12:12:32.911Z').length).toEqual(16);
  });

  it('should handle option when numbers less than 10', () => {
    expect(parseDate('2021-03-03T03:03:03.911Z').length).toEqual(16);
  });
});
