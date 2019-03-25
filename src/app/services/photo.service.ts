import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private url = 'http://localhost:3000/photos';

  constructor(private httpClient: HttpClient) { }

  public getPhotos(): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(this.url);
  }

  public getPhotoById(id: number): Observable<Photo> {
    return this.httpClient.get<Photo>(`${this.url}/${id}`);
  }

  public getPhotosByUserId(id: number): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(`${this.url}/?userId=${id}`);
  }

  public updetePhoto(photo: Photo): Observable<Photo> {
    return this.httpClient.put<Photo>(`${this.url}/${photo.id}`, photo);
  }

  public deletePhotosByUserId(id: number): Observable<Photo[]> {
    return this.httpClient.delete<Photo[]>(`${this.url}/?userId=${id}`);
  }
}
