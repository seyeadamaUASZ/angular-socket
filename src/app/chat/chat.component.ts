import { Component, OnInit } from '@angular/core';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import $ from 'jquery';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
 
  constructor(private auth:AuthService) {
    this.initializeWebSocketConnection();
  }

  ngOnInit() {
  }

  private serverUrl = 'http://localhost:8083/socket';
  private title = 'WebSockets chat';
  private stompClient;

  initializeWebSocketConnection() {
    
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe("/chat",(message) =>{
        if (message.body) {
          $(".chat").append("<div class='message'>" + message.body + "</div>")
          console.log(message.body);
        }
      });
    });
  }

  sendMessage(message) {
    this.stompClient.send("/app/send/message",{}, message);
    $('#input').val('');
  }


}
