import { generateId } from './generateId';

const idsCache = new Set<string>();

describe('styleIt - generateId', () => {
  it('should generate a defined value', () => {
    const id = generateId(idsCache);
    idsCache.add(id);
    expect(id).toBeDefined();
  });

  it('should generate a string id', () => {
    const id = generateId(idsCache);
    idsCache.add(id);
    expect(typeof generateId(idsCache)).toBe('string');
  });

  it('should generate a string the \'_\' as first character', () => {
    const id = generateId(idsCache);
    idsCache.add(id);
    expect(id.charAt(0)).toBe('_');
  });

  it('should generate a unique id', () => {
    const id = generateId(idsCache);
    expect(idsCache.has(id)).toBe(false);
  });
});
