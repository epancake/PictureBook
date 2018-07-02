import { Component } from '@angular/core';
import { ApiCallService } from './api-call.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Picture Book';
  tenPhotos = [];
  tenPhotosTitles = [];

  constructor(
    private apiCallService: ApiCallService) { }

  performSearch(searchTerm: String): void {
    this.tenPhotos = [];
    this.tenPhotosTitles = [];
    this.apiCallService.flickrAPI(`${searchTerm}`).subscribe((pictures: any) => {
      this.tenPhotos = this.apiCallService.tenPhotos;
      this.tenPhotosTitles = this.apiCallService.tenPhotosTitles;
      console.log('p', pictures);
      console.log('tenphotos', this.tenPhotos);
    },
    err => console.error(err),
    () => console.log('done')
    );
  }
}
