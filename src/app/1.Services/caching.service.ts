import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CachingService {

  private cache: Map<string, any> = new Map<string, any>();

  constructor() { }

  storeData(key: string, data: any): void {
    this.cache.set(key, data);
  }

  getData(key: string): any {
    return this.cache.get(key);
  }

  hasData(key: string): boolean {
    return this.cache.has(key);
  }

  clearCache(): void {
    this.cache.clear();
  }

}
