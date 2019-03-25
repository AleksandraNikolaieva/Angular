import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteWarningComponent } from '../delete-warning/delete-warning.component';
import { UserService } from '../user.service';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private user: User;
  private error: string;

  constructor(private userService: UserService, 
    private authService: AuthService,
    private photoService: PhotoService,
    private matDialog: MatDialog) { }

  ngOnInit() {
    this.userService.getUserById(JSON.parse(localStorage.getItem('login')).id)
    .subscribe(
      user => this.user = user,
      error => window.alert(error)
    )
  }

  private logOut() {
    this.authService.logOut();
  }

  private deleteProfile() {
    const dialogRef = this.matDialog.open(DeleteWarningComponent, {data: 'profile'});
    
    dialogRef.afterClosed().subscribe(
      res => {
      if(res) {
        this.userService.deleteUser(this.user.id)
        .subscribe(
          () => {
          this.authService.deleteLogin(this.user.id)
          .subscribe(
            () => {
            this.photoService.getPhotosByUserId(this.user.id)
            .subscribe(
              photos => {
                if(photos.length != 0) {
                  this.photoService.deletePhotosByUserId(this.user.id)
                  .subscribe(() => {}, error => window.alert(error))
                }
                this.authService.logOut();
              },
              error => window.alert(error))
            },
            error => window.alert(error))
          },
          error => window.alert(error))
        }
      }
    )
  }
}
