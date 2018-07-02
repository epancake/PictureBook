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
});
