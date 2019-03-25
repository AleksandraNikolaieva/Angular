import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }
  
  public getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/${id}`);
  }

  public getUserByPhotoId(id: number) {
    return this.httpClient.get<User>(`${this.url}/1`);

  }

  public addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.url, user);
  }
  
  public updeteUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.url}/${user.id}`, user);
  }

  public deleteUser(id: number): Observable<User> {
    return this.httpClient.delete<User>(`${this.url}/${id}`);
  }
}
