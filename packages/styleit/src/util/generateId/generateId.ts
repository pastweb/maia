import { hashID } from '@maia/tools';

export function generateId(idsCache: Set<string>): string {
  return hashID.generateUnique(idsCache, '_');
}
