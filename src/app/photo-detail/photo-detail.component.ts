import { Component, OnInit } from '@angular/core';
import { Photo, User, Comment } from '../models';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteWarningComponent } from '../delete-warning/delete-warning.component';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { map } from 'rxjs/operators';
import { PhotoService } from '../photo.service';

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
  private editNum: number;
  private error: string;

  constructor(private activateRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private userService: UserService,
    private location: Location,
    private photoService: PhotoService) { }

  ngOnInit() {
    this.getPhoto();
    this.getLoggedUser();
  }

  private getPhoto() {
    this.activateRoute.params.subscribe(params => {
      this.photoService.getPhotoById(params.id)
      .subscribe(
        photo => this.photo = photo,
        error => this.error = error
      );
    })
  }

  private getLoggedUser() {
    this.userService.getUserById(JSON.parse(localStorage.getItem('login')).id)
    .subscribe(
      user => this.loggedUser = user,
      error => this.error = error
    );
  }

  private addComment(text: string): void {
    if(text === '') {
      return;
    }
    const newComment = new Comment(this.loggedUser.login, text, new Date().toISOString());
    this.photo.comments.push(newComment);
    this.photoService.updetePhoto(this.photo)
    .subscribe(
      () => {},
      error => {
        this.error = error;
        this.photo.comments.pop()
      }
    );
  }

  private deleteComment(index: number) {
    const dialogRef = this.matDialog.open(DeleteWarningComponent, {data: 'this comment'});

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        let deletedComment: Comment= this.photo.comments.splice(index, 1)[0];
        this.photoService.updetePhoto(this.photo).subscribe(
          () => {},
          error => {
            this.error = error;
            this.photo.comments.push(deletedComment);
          }
        );
      }
    })
  }

  private editComment(index: number, text: string) {
    if(text === '') {
      return;
    }
    let previousComment = this.photo.comments[index].text;
    this.photo.comments[index].text = text;
    this.photoService.updetePhoto(this.photo).subscribe(
      () => {},
      error => {
        this.error = error
        this.photo.comments[index].text = previousComment;
      }
    );
  }

  private goBack() {
    this.location.back();
  }
}
