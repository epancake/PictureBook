import { Component, Output } from '@angular/core';
import { ApiCallService } from './api-call.service';

function remove(item: string, list: string[]) {
  if (list.indexOf(item) !== -1) {
    list.splice(list.indexOf(item), 1);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Picture Book';
  tenPhotos = [];
  tenPhotosTitles = [];
  currentBox?: string;
  guess = {};

  @Output() tenPhotosTitlesArray = this.tenPhotosTitles;

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


  move(box: string, toList: string[]): void {
    remove(box, this.tenPhotosTitles);
    remove(box, this.tenPhotos);
    remove(box, this.tenPhotos);

    toList.push(box);
  }

  addTitlesGuess(matchGuess, oldTitle): void {
    console.log('mo', matchGuess, oldTitle);
    this.guess[oldTitle] = parseInt(matchGuess, 10);
    console.log('guess', this.guess);
  }

  submitTitlesGuess() {
    console.log('submitted')
    // tslint:disable-next-line:forin
    for (const prop in this.guess) {
      if (prop === this.guess[prop]) {
        console.log(`obj.${prop} = ${this.guess[prop]}`)
      }
    }
    // for (var prop in this.guess) {
    //   if (this.guess.prop === this.guess[prop]) {
    //     console.log("match", this.guess.prop, this.guess[prop])
    //   }
    }
  }
}
