import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly messagesWsService: MessagesWsService
  ) {}
  handleConnection(client: any) {
    console.log('Client connected:', client.id);
  }
  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }

}
