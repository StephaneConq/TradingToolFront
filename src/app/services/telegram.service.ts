import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  constructor(
    private http: HttpClient
  ) { }

  checkUser(username): Observable<any> {
    return this.http.get('/telegram/' + username);
  }
}
