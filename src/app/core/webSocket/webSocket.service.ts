import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ProductsEventsService } from '../products/products.events';

@Injectable()
export class WebSocketService {
    private readonly serverUrl = 'http://localhost:9090/prometeus/socket';
    private connected = false;
    private stompClient: any;

    constructor(private productsEventsService: ProductsEventsService) { }

    public initializeWebSocketConnection(): void {
        const ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        if (environment.production) {
            this.stompClient.debug = () => {};
        }
        const _this = this;
        this.stompClient.connect({}, function(frame) {
            _this.connected = true;
            _this.stompClient.subscribe('/chat', (message) => {
                console.log('Message:', message);
                if (message.body) {
                    console.log('Received:', message.body);
                    _this.productsEventsService.refreshPage(message.body);
                }
            });
        });
    }

    public disconnect(): void {
        if (this.stompClient != null && this.connected) {
            this.connected = false;
            this.stompClient.disconnect();
        }
    }
}
