import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CanvasComponent } from './canvas/canvas.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { PhotoCardComponent } from './photo-card/photo-card.component';
import { UserCardComponent } from './user-card/user-card.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteWarningComponent } from './delete-warning/delete-warning.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { HttpErrorInterceptor } from './http-error.interseptor';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    LoginComponent,
    MainComponent,
    RegistrationComponent,
    HeaderComponent,
    PhotoCardComponent,
    UserCardComponent,
    NotFoundComponent,
    DeleteWarningComponent,
    PhotoDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteWarningComponent]
})
export class AppModule { }