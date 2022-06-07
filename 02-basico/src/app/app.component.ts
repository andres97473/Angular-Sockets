import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'basico';

  constructor(
    public websocketService: WebsocketService,
    public chatService: ChatService // public chatService: ChatService
  ) {}
  ngOnInit(): void {
    // console.log('inicio');
    // this.chatService.sendMessage('Hola desde el app');
    this.chatService.getMessagesPrivate().subscribe((msg) => {
      console.log(msg);
    });
  }
}
