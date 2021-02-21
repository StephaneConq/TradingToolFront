import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FtxService {

  constructor(private http: HttpClient) {
  }

  getAllMarket(): Observable<any> {
    return this.http.get('/market');
  }

  getMarket(market): Observable<any> {
    return this.http.get('/market/' + market.replace('/', '---'));
  }
}
