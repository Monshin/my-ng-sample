import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './redux/reducer';
import { effects } from './redux/effect';

import { CoreModule } from './core/core.module';
import { RoutingModule } from './container/routing.module';
import { LayoutModule } from './container/layout/layout.module';

import { AppComponent } from './app.component';

function getInitState() {
  if (typeof window !== 'undefined') {
    const initialState = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;
    return initialState;
  } else {
    return {};
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { initialState: getInitState() }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    CoreModule,
    RoutingModule,
    LayoutModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
