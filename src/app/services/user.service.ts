import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = null;
  resolve = null;
  q = new Promise(resolve => this.resolve = resolve);

  constructor(
    private http: HttpClient
  ) { }

  loadUser(): Observable<any> {
    return this.http.get('/user/me').pipe(map((user: User) => {
      this.user = user;
      this.resolve();
      return;
    }));
  }

  setUser(payload: User): Observable<any> {
    return this.http.patch('/user/me', payload).pipe(map((user: User) => this.user = user));
  }
}
