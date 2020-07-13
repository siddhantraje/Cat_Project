import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { CatService } from './services/cat.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ImagesComponent } from './components/images/images.component';
import { RandomCatComponent } from './components/random-cat/random-cat.component';
import { CategoriesComponent } from './components/categories/categories.component';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    ImagesComponent,
    RandomCatComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule    
  ],
  providers: [
    CatService,
    ProcessHTTPMsgService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
