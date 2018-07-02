import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiCallService } from './api-call.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { FLICKR_REPONSE } from './flicker.fixture.json';

describe('AppComponent', () => {
  let service: ApiCallService;
  let backend: HttpTestingController;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        ApiCallService,
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(ApiCallService);
    backend = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    expect(component.title).toEqual('Picture Book');
  }));
  it('should have 10 pictures', async(() => {
    fixture.detectChanges();
    expect(component.photosData.length).toEqual(0);
    component.performSearch('banana');
    // tslint:disable-next-line:max-line-length
    backend.expectOne(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=236ee9bd3afee7904f32fae37ab4ea2f&format=json&nojsoncallback=1&tags=banana`)
            .flush(FLICKR_REPONSE);

    expect(component.photosData.length).toEqual(100);
    expect(component.tenPhotos.length).toEqual(10);
    backend.verify();
  }));
});
