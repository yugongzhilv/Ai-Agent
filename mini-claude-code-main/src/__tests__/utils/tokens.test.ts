import {
  estimateTokens,
  countMessageTokens,
  countTotalTokens,
  calculateThresholds,
} from '../../utils/tokens';

describe('estimateTokens', () => {
  it('should estimate tokens for empty string', () => {
    expect(estimateTokens('')).toBe(0);
  });

  it('should estimate tokens for short text', () => {
    // 4 chars * 0.25 = 1 token
    expect(estimateTokens('test')).toBe(1);
  });

  it('should estimate tokens for longer text', () => {
    // 100 chars * 0.25 = 25 tokens
    const text = 'a'.repeat(100);
    expect(estimateTokens(text)).toBe(25);
  });

  it('should round up fractional tokens', () => {
    // 3 chars * 0.25 = 0.75, should round up to 1
    expect(estimateTokens('abc')).toBe(1);
  });
});

describe('countMessageTokens', () => {
  it('should count tokens for string content', () => {
    const content = 'Hello, World!';
    // 13 chars * 0.25 = 3.25, rounded up to 4
    expect(countMessageTokens(content)).toBe(4);
  });

  it('should count tokens for text blocks', () => {
    const content = [
      { type: 'text', text: 'Hello' },
      { type: 'text', text: 'World' },
    ];
    // Each text block: 5 chars * 0.25 = 1.25, ceil = 2
    // Total: 2 + 2 = 4
    expect(countMessageTokens(content)).toBe(4);
  });

  it('should count tokens for tool_use blocks', () => {
    const content = [
      { type: 'tool_use', input: { command: 'ls' } },
    ];
    // JSON.stringify({command: 'ls'}) = '{"command":"ls"}' = 16 chars * 0.25 = 4
    expect(countMessageTokens(content)).toBe(4);
  });

  it('should count tokens for tool_result blocks', () => {
    const content = [
      { type: 'tool_result', content: 'file1.txt\nfile2.txt' },
    ];
    // 19 chars * 0.25 = 4.75, rounded up to 5
    expect(countMessageTokens(content)).toBe(5);
  });

  it('should return 0 for empty array', () => {
    expect(countMessageTokens([])).toBe(0);
  });
});

describe('countTotalTokens', () => {
  it('should count tokens for multiple messages', () => {
    const messages = [
      { role: 'user' as const, content: 'Hello' },
      { role: 'assistant' as const, content: 'Hi there!' },
    ];
    // 'Hello' = 5 * 0.25 = 1.25 -> 2
    // 'Hi there!' = 10 * 0.25 = 2.5 -> 3
    // Total = 5
    expect(countTotalTokens(messages)).toBe(5);
  });

  it('should handle messages with array content', () => {
    const messages = [
      {
        role: 'assistant' as const,
        content: [
          { type: 'text' as const, text: 'Sure!' },
        ],
      },
    ];
    // 5 chars * 0.25 = 1.25, rounded up to 2
    expect(countTotalTokens(messages)).toBe(2);
  });

  it('should return 0 for empty messages', () => {
    expect(countTotalTokens([])).toBe(0);
  });
});

describe('calculateThresholds', () => {
  it('should calculate thresholds correctly', () => {
    const result = calculateThresholds(50000, 200000, 0.92);

    expect(result.contextLimit).toBe(200000);
    expect(result.autoCompactThreshold).toBe(184000);
    expect(result.percentage).toBe(25);
    expect(result.percentUsed).toBe(25);
    expect(result.isAboveAutoCompactThreshold).toBe(false);
    expect(result.isAboveWarningThreshold).toBe(false);
    expect(result.tokensRemaining).toBe(134000);
  });

  it('should detect above auto-compact threshold', () => {
    const result = calculateThresholds(190000, 200000, 0.92);

    expect(result.isAboveAutoCompactThreshold).toBe(true);
    expect(result.percentage).toBe(95);
    expect(result.tokensRemaining).toBe(0);
  });

  it('should detect above warning threshold', () => {
    const result = calculateThresholds(150000, 200000, 0.92);

    expect(result.isAboveAutoCompactThreshold).toBe(false);
    expect(result.isAboveWarningThreshold).toBe(true);
    expect(result.percentage).toBe(75);
  });

  it('should use default values', () => {
    const result = calculateThresholds(0);

    expect(result.contextLimit).toBeDefined();
    expect(result.autoCompactThreshold).toBeDefined();
  });
});
