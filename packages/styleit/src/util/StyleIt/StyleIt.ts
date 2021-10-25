import { addScopedCSS, ScopedNames } from '../addScopedCSS';
import { getCache, Cache } from '../getCache';
import { getUpdateTarget, UpdateTarget } from '../getUpdateTarget';
import { getStyleItCacheTagString as _getStyleItCacheTagString } from '../getStyleItCacheTagString';
import { removeScopedCSS } from '../removeScopedCSS';
import { StyleDetail } from '../css';
import { StyleItOptions } from './types';
import { defaultPreProcessor } from '../defaultPreProcessor';

export class StyleIt {
  private updateTarget: UpdateTarget;
  private cache: Cache;
  private options: StyleItOptions;
  
  constructor(options : StyleItOptions) {
    this.updateTarget = getUpdateTarget();
    this.cache = getCache();
    this.options = options;

    if (!options.preProcessor) {
      this.options.preProcessor = defaultPreProcessor;
    }
  }

  public add(styleDetail: StyleDetail): ScopedNames {
    return addScopedCSS(
      styleDetail,
      this.cache,
      this.updateTarget,
      (this.options as any).preProcessor
    );
  }

  public remove(styleDetail: StyleDetail): void {
    removeScopedCSS(styleDetail, this.cache, this.updateTarget);
  }

  public getStyleItCacheTagString(): string {
    return _getStyleItCacheTagString(this.cache)
  }
}
