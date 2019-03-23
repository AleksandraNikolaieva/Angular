import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Photo, User } from '../models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  photos: Photo[];

  constructor(private usersService: UserService) { }

  ngOnInit() {
    this.getPhotos();
  }

  private getPhotos() {
    this.usersService.getUsers()
    .pipe(
      map(users => {
        let photos: Photo[] = [];
        users.map(user => {
          for(let photo of user.photos) {
            photos.push(photo);
          }
        })
        return photos;
      })
    )
    .subscribe(photos => {
      photos.sort((photo1, photo2) => {
        if(photo1.created_at > photo2.created_at) {
          return -1;
        } else {
          return 1;
        }
      })
      return this.photos = photos
    })
  }
}
