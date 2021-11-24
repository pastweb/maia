import { DependencyInfo } from './types';

export async function loadDependency(dependency: DependencyInfo): Promise<any> {
  const { onSuccess, onError } = dependency;
  const exportName = Object.keys(dependency)[0];
  const depPromise =  dependency[exportName];
  try {
    const module = await Promise.resolve(depPromise);
    if (onSuccess) onSuccess(module[exportName]);
  } catch(e) {
    if (onError) onError(e);
    throw e;
  }
}
