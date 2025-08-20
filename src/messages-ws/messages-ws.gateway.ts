import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService
  ) {}

  handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;

    console.log({ token });

    this.messagesWsService.registerClient(client);

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }

  //! Emite solo al cliente que hace la peticion
  // @SubscribeMessage('message-from-client')
  // handleMessageFromClient( client: Socket, payload: NewMessageDto ) {
  //   //message-from-server
  //   client.emit('message-from-server', {
  //     fullName: 'soy Yo !!!!',
  //     message: payload.message || 'no-message',
  // });
  // }

  // //! Emite a todos menos al cliente inicial
  // @SubscribeMessage('message-from-client')
  // handleMessageFromClient(client: Socket, payload: NewMessageDto) {
  //   client.broadcast.emit('message-from-server', {
  //     fullName: 'soy Yo !!!!',
  //     message: payload.message || 'no-message',
  //   });
  // }

  // Emite a todos los clientes conectados
  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    this.wss.emit('message-from-server', {
      fullName: 'soy Yo !!!!',
      message: payload.message || 'no-message',
    });
  }
}