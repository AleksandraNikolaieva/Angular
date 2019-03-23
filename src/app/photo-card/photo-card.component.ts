import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Photo, User } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.css']
})
export class PhotoCardComponent implements OnInit, AfterViewInit {
  @Input() private photo: Photo;
  @ViewChild('like') private like: ElementRef;
  private isLiked: boolean = false;
  private photoOwner: User;
  private loggedUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserById(this.photo.userId)
    .subscribe(user => this.photoOwner = user);
  }

  ngAfterViewInit() {
    this.markLikes();
  }

  private toggleLike() {
    this.isLiked = !this.isLiked;

    if(this.isLiked === true) {
      this.photo.likes_count++;
      this.photoOwner.photos.find(el => el.id === this.photo.id).likes_count++;
      this.like.nativeElement.style.backgroundImage = "url('../../assets/blackHeart.svg')";
      this.photoOwner.photos.find(el => el.id === this.photo.id).liked_by.push(this.loggedUser.login);
    } else {
      this.photo.likes_count--;
      this.photoOwner.photos.find(el => el.id === this.photo.id).likes_count--;
      this.like.nativeElement.style.backgroundImage = "url('../../assets/heart.svg')";
      const index = this.photo.liked_by.indexOf(this.loggedUser.login);
      this.photoOwner.photos.find(el => el.id === this.photo.id).liked_by.splice(index, 1);
    }

    this.userService.updeteUser(this.photoOwner)
    .subscribe()
  }

  private markLikes() {
    const likesFrom = this.photo.liked_by;
    this.userService.getUserById(+localStorage.getItem('id'))
    .subscribe(user => {
      this.loggedUser = user;
      likesFrom.forEach(user => {
        if(user === this.loggedUser.login) {
          this.isLiked = true;
          this.like.nativeElement.style.backgroundImage = "url('../../assets/blackHeart.svg')";
        }
      })
    });
  }
}
