import { safePath, ensureDir } from '../../utils/file-helpers';

// Note: safePath tests require proper filesystem mocking
// These tests verify the function interface

describe('safePath', () => {
  it('should be a function', () => {
    expect(typeof safePath).toBe('function');
  });

  it('should throw error for path traversal attempt', () => {
    // Path traversal should always be rejected
    expect(() => safePath('../../../etc/passwd')).toThrow();
  });
});

describe('ensureDir', () => {
  it('should be a function', () => {
    expect(typeof ensureDir).toBe('function');
  });
});
