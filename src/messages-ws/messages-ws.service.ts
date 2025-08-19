import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ConnectedClients {
    [id: string]: Socket
}

@Injectable()
export class MessagesWsService {
    private connectedClients: ConnectedClients = {};


    registerClient(client: Socket)
    {
        this.connectedClients[client.id] = client;
        console.log('Client registered:', client.id);
    }

    removeClient(clientId: string)
    {
        delete this.connectedClients[clientId];
        console.log('Client removed:', clientId);
    }

    getConnectedClients(): number
    {
        return Object.keys(this.connectedClients).length;
    }
}
