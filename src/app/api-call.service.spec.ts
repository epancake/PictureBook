import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ApiCallService } from './api-call.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { FLICKR_REPONSE } from './flicker.fixture.json';

describe('ApiCallService', () => {
  let service: ApiCallService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiCallService],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(ApiCallService);
    backend = TestBed.get(HttpTestingController);
  });

  it('should expectOne url', () => {
    service.flickrAPI('banana').subscribe();
    backend.expectOne(service.flickrApi + '&tags=banana');
    backend.verify();
  });

  it('should expectOne url and get method', () => {
    service.flickrAPI('banana').subscribe();
    backend.expectOne((request) => {
      return request.url.match('&tags=banana') && request.method === 'GET';
    });
    backend.verify();
  });

  it('should expectOne url and get method in a simpler way', () => {
    service.flickrAPI('banana').subscribe();
    backend.expectOne({url: service.flickrApi + '&tags=banana', method: 'GET'});
    backend.verify();
  });

  it('should have 100 pictures in the response', () => {
    expect(service.response.length).toEqual(0);
    service.flickrAPI('banana').subscribe();
    // tslint:disable-next-line:max-line-length
    backend.expectOne(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=236ee9bd3afee7904f32fae37ab4ea2f&format=json&nojsoncallback=1&tags=banana`)
            .flush(FLICKR_REPONSE);
    expect(service.response.length).toEqual(100);
    backend.verify();
  });

  it('should have 100 pictures in the response', () => {
    expect(service.response.length).toEqual(0);
    service.flickrAPI('banana').subscribe();
    // tslint:disable-next-line:max-line-length
    backend.expectOne(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=236ee9bd3afee7904f32fae37ab4ea2f&format=json&nojsoncallback=1&tags=banana`)
            .flush(FLICKR_REPONSE);
    expect(service.response.length).toEqual(100);
    backend.verify();
  });

  it('should have 10 items in the tenPhotos variable', () => {
    expect(service.response.length).toEqual(0);
    service.flickrAPI('banana').subscribe();
    // tslint:disable-next-line:max-line-length
    backend.expectOne(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=236ee9bd3afee7904f32fae37ab4ea2f&format=json&nojsoncallback=1&tags=banana`)
            .flush(FLICKR_REPONSE);
    expect(service.tenPhotos.length).toEqual(10);
    backend.verify();
  });

  it('should assign indeces to each of the 10 photos', () => {
    service.flickrAPI('banana').subscribe();
    // tslint:disable-next-line:max-line-length
    backend.expectOne(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=236ee9bd3afee7904f32fae37ab4ea2f&format=json&nojsoncallback=1&tags=banana`)
            .flush(FLICKR_REPONSE);
    expect(service.tenPhotos[9].index).toEqual(9);
    backend.verify();
  });

  it('should create an alphebatized list of ten photos', () => {
    service.flickrAPI('banana').subscribe();
    // tslint:disable-next-line:max-line-length
    backend.expectOne(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=236ee9bd3afee7904f32fae37ab4ea2f&format=json&nojsoncallback=1&tags=banana`)
            .flush(FLICKR_REPONSE);
    expect(service.makeAlphabeticalTenPhotos().length).toEqual(10);
    expect(service.makeAlphabeticalTenPhotos()[9].title).toBeGreaterThan(service.makeAlphabeticalTenPhotos()[8].title);
    backend.verify();
  });
});
