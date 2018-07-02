import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable()
export class ApiCallService {

  // tslint:disable-next-line:max-line-length
  flickrApi = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=236ee9bd3afee7904f32fae37ab4ea2f&format=json&nojsoncallback=1';

  constructor(private _http: HttpClient) { }
  response = [];

  flickrAPI(tagname): any {
    return this._http.get(this.flickrApi + '&tags=' + tagname).pipe(
      tap(data => {
        const response = data.photos.photo
        console.log('data', data.photos)
      }),
      catchError(this.handleError) );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

// pickTen(): void {
//   for (let i = 0; this.tenPhotos.length < 10; i++) {
//     if (!/\d/.test(this.photosData[i].title) && this.photosData[i].title) {
//       let score = 0;
//       for (let j = 0; j < this.tenPhotos.length; j++) {
//         if (this.photosData[i].title === this.tenPhotos[j].title) {
//           score++;
//         }
//       }
//       if (score === 0) {
//         this.tenPhotos.push(this.photosData[i]);
//         this.tenPhotosTitles.push(this.photosData[i]);
//       }
//     }
//   }
//   this.assignIndexToPics();
//   this.randomizeTitles();
//   console.log('tenPhotos', this.tenPhotos);
//   console.log('tenPhotosTitles', this.tenPhotosTitles);
// }

// randomizeTitles(): void {
//   this.tenPhotosTitles.sort(function(a, b) {
//     if (a.title < b.title) {
//       return -1;
//     }
//     if (a.title > b.title) {
//       return 1;
//     }
//     return 0;
//   });
// }

// assignIndexToPics(): void {
//   let num = 0;
//   this.tenPhotos.forEach(item => {
//     item.index = num;
//     num++;
//   });
//   let num2 = 0;
//   this.tenPhotosTitles.forEach(item => {
//     item.index = num2;
//     num2++;
//   });
// }
// }

