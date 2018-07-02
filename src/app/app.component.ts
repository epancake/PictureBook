import { Component } from '@angular/core';
import { ApiCallService } from './api-call.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Picture Book';
  photosData = [];
  tenPhotos = [];
  titles = [];
  tenPhotosTitles = [];

  constructor(
    private apiCallService: ApiCallService) { }

  performSearch(searchTerm: HTMLInputElement): void {
    this.tenPhotos = [];
    this.tenPhotosTitles = [];
    this.apiCallService.flickrAPI(`${searchTerm.value}`).subscribe((pictures: any) => {
      this.photosData = pictures.photos.photo;
      this.pickTen();
    },
    err => console.error(err),
    () => console.log('done')
  );
}
  pickTen(): void {
    for (let i = 0; this.tenPhotos.length < 10; i++) {
      if (!/\d/.test(this.photosData[i].title) && this.photosData[i].title) {
        let score = 0;
        for (let j = 0; j < this.tenPhotos.length; j++) {
          if (this.photosData[i].title === this.tenPhotos[j].title) {
            score++;
          }
        }
        if (score === 0) {
          this.tenPhotos.push(this.photosData[i]);
          this.tenPhotosTitles.push(this.photosData[i]);
        }
      }
    }
    this.assignIndexToPics();
    this.randomizeTitles();
    console.log('tenPhotos', this.tenPhotos);
    console.log('tenPhotosTitles', this.tenPhotosTitles);
  }

  randomizeTitles(): void {
    this.tenPhotosTitles.sort(function(a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }

  assignIndexToPics(): void {
    let num = 0;
    this.tenPhotos.forEach(item => {
      item.index = num;
      num++;
    });
    let num2 = 0;
    this.tenPhotosTitles.forEach(item => {
      item.index = num2;
      num2++;
    });
  }
}
