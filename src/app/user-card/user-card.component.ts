import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, Photo } from '../models';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  private user: User;
  private photos: Photo[];
  private error: string;

  constructor(private activateRoute: ActivatedRoute, 
    private location: Location,
    private userService: UserService,
    private photoService: PhotoService) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(param => {
      this.userService.getUserById(param.id)
      .subscribe(
        res => this.user = res,
        error => this.error = error
      );
      this.photoService.getPhotosByUserId(param.id)
      .subscribe(
        photos => this.photos = photos,
        error => this.error = error
      );
    })
  }

  private goBack() {
    this.location.back();
  }
}
