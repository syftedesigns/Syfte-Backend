import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/public/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { AngularMaterialModule } from './angular-material.module';
import { StaticModule } from './components/static/static.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/pages/main.component';
import { LoginComponent } from './components/public/login/login.component';
import { RenderPagesModule } from './components/shared/render-pages.module';
// APP services
import { ServicesModule } from './services/services.module';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
// Map
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { AuthGuard } from './guard/auth.guard';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MainComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    APP_ROUTES,
    AngularMaterialModule,
    StaticModule,
    FormsModule,
    BrowserAnimationsModule,
    RenderPagesModule,
    ServicesModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCMtc17DAyN0r4dRwL5nd798MvmCf93KYg',
      authDomain: 'soluclic-ba766.firebaseapp.com',
      databaseURL: 'https://soluclic-ba766.firebaseio.com',
      projectId: 'soluclic-ba766',
      storageBucket: 'soluclic-ba766.appspot.com',
      messagingSenderId: '692724292042'
    }),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
    /*NgxMapboxGLModule.withConfig({
      accessToken: environment.mapbox.token,
      geocoderAccessToken: environment.mapbox.token
    })*/
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
