import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ItemsComponent } from './components/items/items.component';
import { ClaimsComponent } from './components/claims/claims.component';
import { PdfUploadComponent } from './components/pdf-upload/pdf-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    ItemsComponent,
    ClaimsComponent,
    PdfUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
