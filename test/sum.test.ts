import sum from "../src/sum";

describe('sum', () => {
  it('should pass', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
