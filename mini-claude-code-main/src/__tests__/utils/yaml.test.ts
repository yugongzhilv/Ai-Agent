import {
  extractYamlField,
  hasValidFrontmatter,
  extractYamlFields,
} from '../../utils/yaml';

describe('extractYamlField', () => {
  it('should extract field value from frontmatter', () => {
    const content = `---
name: my-skill
description: A test skill
---

# Content`;
    expect(extractYamlField(content, 'name')).toBe('my-skill');
    expect(extractYamlField(content, 'description')).toBe('A test skill');
  });

  it('should return empty string for missing field', () => {
    const content = `---
name: my-skill
---`;
    expect(extractYamlField(content, 'description')).toBe('');
  });

  it('should handle values with colons', () => {
    const content = `---
url: https://example.com:8080/path
---`;
    expect(extractYamlField(content, 'url')).toBe('https://example.com:8080/path');
  });

  it('should trim whitespace from values', () => {
    const content = `---
name:   my-skill
---`;
    expect(extractYamlField(content, 'name')).toBe('my-skill');
  });
});

describe('hasValidFrontmatter', () => {
  it('should return true for valid frontmatter', () => {
    const content = `---
name: test
---
Content`;
    expect(hasValidFrontmatter(content)).toBe(true);
  });

  it('should return false for content without frontmatter', () => {
    const content = '# Just a heading\nSome content';
    expect(hasValidFrontmatter(content)).toBe(false);
  });

  it('should handle leading whitespace', () => {
    const content = `  ---
name: test
---`;
    expect(hasValidFrontmatter(content)).toBe(true);
  });
});

describe('extractYamlFields', () => {
  it('should extract multiple fields', () => {
    const content = `---
name: my-skill
description: A test skill
version: 1.0.0
---`;
    const result = extractYamlFields(content, ['name', 'description', 'version']);
    expect(result).toEqual({
      name: 'my-skill',
      description: 'A test skill',
      version: '1.0.0',
    });
  });

  it('should return empty strings for missing fields', () => {
    const content = `---
name: my-skill
---`;
    const result = extractYamlFields(content, ['name', 'missing']);
    expect(result).toEqual({
      name: 'my-skill',
      missing: '',
    });
  });

  it('should handle empty fields array', () => {
    const content = '---\n---';
    const result = extractYamlFields(content, []);
    expect(result).toEqual({});
  });
});
