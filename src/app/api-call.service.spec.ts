import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';


import { ApiCallService } from './api-call.service';

describe('ApiCallService', () => {
  let service: ApiCallService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiCallService],
      imports: [
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
});
