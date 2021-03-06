import {
  reactionSingleStep,
  reaction,
  optimizePolymer,
} from './day-05-alchemical-reduction';
import INPUT from './day-05-data';

describe('Part One', () => {
  it('handles a reaction', () => {
    expect(reactionSingleStep('aA')).toBe('');
    expect(reactionSingleStep('abBA')).toBe('aA');
  });
  it('does not react', () => {
    expect(reactionSingleStep('abAB')).toBe('abAB');
    expect(reactionSingleStep('aabAAB')).toBe('aabAAB');
  });
  it('handles a multistep reaction', () => {
    expect(reaction('dabAcCaCBAcCcaDA')).toBe('dabCBAcaDA');
  });

  it('answer', () => {
    const result = reaction(INPUT);
    expect(result.length).toMatchInlineSnapshot(`9172`);
  });
});

describe('Part Two', () => {
  it('finds optimization', () => {
    const result = optimizePolymer('dabAcCaCBAcCcaDA');
    expect(result).toEqual({
      result: 'daDA',
      unit: 'c',
    });
  });
  it('answer', () => {
    const result = optimizePolymer(INPUT);
    expect(result.unit).toMatchInlineSnapshot(`"x"`);
    expect(result.result.length).toMatchInlineSnapshot(`6550`);
  });
});
