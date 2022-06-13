import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

// sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { MapaComponent } from './components/mapa/mapa.component';

@NgModule({
  declarations: [AppComponent, MapaComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(environment.socketConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
