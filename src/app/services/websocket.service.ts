import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socketStatus = false;
  public usuario!: Usuario;

  constructor(private socket: Socket) {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });
    this.socket.on('disconnect', () => {
      console.log('Desconectado de servidor');
      this.socketStatus = false;
    });
  }

  emit(evento: string, payload?: any, callback?: Function) {
    // emit('EVENTO', payload, callback)
    this.socket.emit(evento, payload, callback);
  }

  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWS(nombre: string) {
    // console.log('Configurando ', nombre);

    // this.socket.emit('configurar-usuario', { nombre }, (resp: any) => {
    //   console.log(resp);
    // });

    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, (resp: any) => {
        // console.log(resp);
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve(resp);
      });
    });
  }

  getUsuario() {
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    const nUsuario = localStorage.getItem('usuario');
    if (nUsuario != null) {
      this.usuario = JSON.parse(nUsuario);
      this.loginWS(this.usuario.nombre);
    }
  }
}
