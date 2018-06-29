import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    BrowserAnimationsModule,
  ],
  providers: [
    ApiCallService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}
