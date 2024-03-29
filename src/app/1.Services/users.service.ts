import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { CachingService } from './caching.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string = 'https://reqres.in/api/';

  constructor(private http: HttpClient, private cachingService: CachingService) { }

  getUsers(page: number): Observable<any> {
    const cacheKey = `users-${page}`;
    if (this.cachingService.hasData(cacheKey)) return of(this.cachingService.getData(cacheKey));
    else {
      return this.http.get<any>(this.baseUrl + `users?page=${page}`)
        .pipe(tap((data: any) => this.cachingService.storeData(cacheKey, data)));
    }
  }

  getUserById(id: string): Observable<any> {
    const cacheKey = `user-${id}`;
    if (this.cachingService.hasData(cacheKey)) return of(this.cachingService.getData(cacheKey));
    else {
      return this.http.get<any>(this.baseUrl + `users/${id}`)
        .pipe(tap((data: any) => this.cachingService.storeData(cacheKey, data)));
    }
  }

}
