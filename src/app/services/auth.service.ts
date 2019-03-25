import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = 'http://localhost:3000/logins';

  public isUserLogged: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  public logIn(email: string, password: string): Observable<boolean> {
    return this.httpClient.get<Login[]>(this.url)
    .pipe(
      map(logins => {
        let index = logins.findIndex(el => el.email === email && el.password === password);
        if(index !== -1) {
          this.isUserLogged = true;
          localStorage.setItem('login', JSON.stringify({id: index + 1, email: email, password: password}));
          return true;
        }
        return false;
      })
    )
  }

  public logOut() {
    this.isUserLogged = false;
    localStorage.removeItem('login');
    this.router.navigate(['/login']);
  }

  public addLogin(email: string, password: string): Observable<Login> {
    return this.httpClient.post<Login>(this.url, {"email": email, "password": password})
    .pipe(
      tap(login => localStorage.setItem('login', JSON.stringify({id: login.id, email: email, password: password})))
    )
  }

  public isMailExist(email: string): Observable<boolean> {
    return this.httpClient.get<Login[]>(`${this.url}/?email=${email}`)
    .pipe(
      map(login => login.length === 0 ? false : true)
    )
  }

  public deleteLogin(id: number): Observable<Login> {
    return this.httpClient.delete<Login>(`${this.url}/${id}`)
  }
}

