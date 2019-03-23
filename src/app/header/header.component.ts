import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteWarningComponent } from '../delete-warning/delete-warning.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private user: User;

  constructor(private userService: UserService, 
    private authService: AuthService,
    private matDialog: MatDialog) { }

  ngOnInit() {
    this.userService.getUserById(+localStorage.getItem('id'))
    .subscribe(user => {
      this.user = user;
    })
  }

  private logOut() {
    this.authService.logOut();
  }

  private deleteProfile() {
    const dialogRef = this.matDialog.open(DeleteWarningComponent, {data: 'profile'});
    
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.userService.deleteUser(this.user.id)
        .subscribe(() => {
          this.authService.logOut();
        })
      }
    })
  }
}
