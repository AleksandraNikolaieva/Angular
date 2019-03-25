import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteWarningComponent } from '../delete-warning/delete-warning.component';
import { UserService } from '../services/user.service';
import { PhotoService } from '../services/photo.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private user: User;

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
          const deleteUser = this.userService.deleteUser(this.user.id);
          const deleteLogin = this.authService.deleteLogin(this.user.id);

          combineLatest(deleteUser, deleteLogin)
          .subscribe(
            () => {
              this.authService.logOut();
            },
            error => window.alert(error)
          )
        }
      }
    )
  }
}
