import { clampText } from '../../utils/text-helpers';

describe('clampText', () => {
  it('should return original string if shorter than limit', () => {
    const text = 'Hello, World!';
    expect(clampText(text, 100)).toBe(text);
  });

  it('should return original string if equal to limit', () => {
    const text = 'Hello';
    expect(clampText(text, 5)).toBe(text);
  });

  it('should truncate string longer than limit', () => {
    const text = 'Hello, World!';
    const result = clampText(text, 5);
    expect(result).toBe('Hello\n\n...<truncated 8 chars>');
  });

  it('should use default limit of 100000', () => {
    const text = 'a'.repeat(100001);
    const result = clampText(text);
    expect(result.length).toBeLessThan(100001 + 50);
    expect(result).toContain('...<truncated 1 chars>');
  });

  it('should handle empty string', () => {
    expect(clampText('', 100)).toBe('');
  });
});
