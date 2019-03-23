import { Component, OnInit } from '@angular/core';
import { Photo, User, Comment } from '../models';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteWarningComponent } from '../delete-warning/delete-warning.component';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service'
import { UserService } from '../user.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {
  private photo: Photo;
  private loggedUser: User;
  private photoOwner: User;
  private isEditFormOpen: boolean = false;

  constructor(private activateRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private authService: AuthService,
    private location: Location,
    private userService: UserService) { }

  ngOnInit() {
    this.getPhoto();
    this.getLoggedUser();
  }

  private getPhoto() {
    this.activateRoute.params.subscribe(params => {
      this.userService.getUsers()
      .pipe(
        map(users => {
          let photo: Photo;
          users.map(user => {
            const photoItem = user.photos.find(photo => photo.id === +params.id);
            if(photoItem) {
              photo = photoItem;
              this.userService.getUserById(photo.id).subscribe(user => this.photoOwner = user);
            }
          })
          return photo;
        })
      )
      .subscribe(res => this.photo = res);
    })
  }

  private getLoggedUser() {
    this.userService.getUserById(+localStorage.getItem('id'))
    .subscribe(user => this.loggedUser = user);
  }

  private addComment(text: string): void {
    if(text === '') {
      return;
    }
    const newComment = new Comment(this.loggedUser.login, text, new Date().toISOString());
    this.photo.comments.push(newComment);
    this.userService.getUserById(this.photo.userId)
    .subscribe(user => {
      this.photoOwner.photos.find(photo => photo.id === this.photo.id).comments.push(newComment);
      this.userService.updeteUser(this.photoOwner).subscribe();
    })
  }

  private deleteComment(index: number) {
    const dialogRef = this.matDialog.open(DeleteWarningComponent, {data: 'this comment'});

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.photo.comments.splice(index, 1);
        this.photoOwner.photos.find(photo => photo.id === this.photo.id).comments.splice(index, 1);
        this.userService.updeteUser(this.photoOwner).subscribe();
      }
    })
  }

  private editComment(index: number, text: string) {
    if(text === '') {
      return;
    }
    this.photo.comments[index].text = text;
    this.photoOwner.photos.find(photo => photo.id === this.photo.id)
    .comments[index].text = text;
    this.userService.updeteUser(this.photoOwner).subscribe();
  }

  private goBack() {
    this.location.back();
  }
}
