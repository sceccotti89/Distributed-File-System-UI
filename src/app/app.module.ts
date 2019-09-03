import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from './core/core.module';
import { CheckboxReducer } from './shared/ngrx/files/reducers/checkbox.reducers';
import { LeftNavbarReducer } from './shared/ngrx/files/reducers/left-navbar.reducers';
import { StorageService } from './shared/services/storage.service';
import { DocumentService } from './shared/services/document.service';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200/prometeus'],
        blacklistedRoutes: ['localhost:4200/prometeus/login']
      }
    }),
    StoreModule.forRoot({
      'checkbox': CheckboxReducer,
      'leftNavbar': LeftNavbarReducer // TODO spostare nella sezione appropriata
    }),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.6)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    EffectsModule.forRoot([]),
    CoreModule
  ],
  providers: [StorageService, DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
