import { Component, OnInit } from '@angular/core';
import { Photo, User } from '../models';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private photos: Photo[];
  private error: string;

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.getPhotos();
  }

  private getPhotos() {
    this.photoService.getPhotos()
    .subscribe(
      photos => this.photos = photos,
      error => this.error = error
    )
  }
}
