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
  tenPhotos = [];
  tenPhotosTitles = [];

  flickrAPI(tagname): any {
    this.tenPhotos = [];
    this.tenPhotosTitles = [];
    return this._http.get(this.flickrApi + '&tags=' + tagname).pipe(
      tap(((data: any) => {
        this.response = data.photos.photo;
        for (let i = 0; this.tenPhotos.length < 10; i++) {
          if (!/\d/.test(this.response[i].title) && this.response[i].title) {
            let score = 0;
            for (let j = 0; j < this.tenPhotos.length; j++) {
              if (this.response[i].title === this.tenPhotos[j].title) {
                score++;
              }
            }
            if (score === 0) {
              this.tenPhotos.push(this.response[i]);
              this.tenPhotosTitles.push(this.response[i]);
            }
          }
        }
        this.tenPhotos.map((photo, i) => photo.index = i + 1);
        this.makeAlphabeticalTenPhotos();
        console.log('tp', this.tenPhotos);
        console.log('tpt', this.tenPhotosTitles);
        return this.tenPhotos;
      }),
      catchError(this.handleError) )
    );
  }

  makeAlphabeticalTenPhotos(): any {
    return this.tenPhotosTitles.sort(function(a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
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

