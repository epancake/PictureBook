import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiCallService } from './api-call.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let service: ApiCallService;
  let backend: HttpTestingController;
  let frontend: AppComponent;
  const searchTerm = HTMLInputElement;


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
    frontend = TestBed.get(AppComponent);
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Picture Book');
  }));
  it('should have 10 pictures', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    frontend.performSearch('banana');
    expect(app.tenPhotos.length).toEqual(10);
  }));
});
