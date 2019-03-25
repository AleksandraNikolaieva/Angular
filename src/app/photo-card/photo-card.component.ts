import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { Photo, User } from '../models';
import { UserService } from '../services/user.service';
import { PhotoService } from '../services/photo.service';

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

  constructor(private userService: UserService, 
    private photoService: PhotoService,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.userService.getUserById(this.photo.userId)
    .subscribe(
      user => this.photoOwner = user,
      error => window.alert(error));
  }

  ngAfterViewInit() {
    this.markLikes();
  }

  private toggleLike() {
    this.changeLikeCount();
    this.photoService.updetePhoto(this.photo)
    .subscribe(
      () => {},
      error => {
        window.alert(error);
        this.changeLikeCount();
      })
  }

  private changeLikeCount() {
    this.isLiked = !this.isLiked;
    if(this.isLiked) {
      this.photo.likes_count++;
      this.renderer.setStyle(this.like.nativeElement, 'backgroundImage', 'url("../../assets/blackHeart.svg")');
      this.photo.liked_by.push(this.loggedUser.login);
    } else {
      this.photo.likes_count--;
      this.renderer.setStyle(this.like.nativeElement, 'backgroundImage', 'url("../../assets/heart.svg")')
      const index = this.photo.liked_by.indexOf(this.loggedUser.login);
      this.photo.liked_by.splice(index, 1);
    }
  }

  private markLikes() {
    const likesFrom = this.photo.liked_by;
    this.userService.getUserById(JSON.parse(localStorage.getItem('login')).id)
    .subscribe(
      user => {
        this.loggedUser = user;
        likesFrom.forEach(user => {
          if(user === this.loggedUser.login) {
            this.isLiked = true;
            this.renderer.setStyle(this.like.nativeElement, 'backgroundImage', 'url("../../assets/blackHeart.svg")');
          }
        })
      },
      error => window.alert(error)
    );
  }
}
