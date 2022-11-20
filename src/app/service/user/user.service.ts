import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  _dataUser = new BehaviorSubject(null);
  constructor(private http: HttpClient) {}

  doLogin(user: User): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(user);
    // console.log(body)
    return this.http
      .post('https://dummyjson.com/auth/login', body, { headers: headers })
      .pipe(
        catchError((err) => {
          throw err;
        })
      );
  }
}
