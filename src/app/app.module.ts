import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MaterialModule} from './material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProdInterceptor} from './interceptors/prod.interceptor';
import {LocalInterceptor} from './interceptors/local.interceptor';
import { HomeComponent } from './components/home/home.component';
import { FirstTimeComponent } from './dialogs/first-time/first-time.component';
import { SearchComponent } from './components/search/search.component';
import { StockComponent } from './components/stock/stock.component';
import { AddStockComponent } from './dialogs/add-stock/add-stock.component';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FirstTimeComponent,
    SearchComponent,
    StockComponent,
    AddStockComponent,
    ConfirmComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: environment.production ? ProdInterceptor : LocalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
