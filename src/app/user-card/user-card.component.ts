import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, Photo } from '../models';
import { tap, map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  private user: User;

  constructor(private activateRoute: ActivatedRoute, 
    private location: Location,
    private userService: UserService) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(param => {
      this.userService.getUserById(param.id)
      .subscribe(res => this.user = res);
    })
  }

  private goBack() {
    this.location.back();
  }
}
