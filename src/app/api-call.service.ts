import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable()
export class ApiCallService {
  // tslint:disable-next-line:max-line-length
  flickrApi = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=236ee9bd3afee7904f32fae37ab4ea2f&format=json&nojsoncallback=1';

  constructor(private _http: HttpClient) { }
  flickrAPI(tagname): any {
    return this._http.get(this.flickrApi + '&tags=' + tagname).pipe(
      // tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError), );
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
