import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { SocketIOCtx, SocketIOHandshakeQuery } from "../types/socketio";
/**
 * get the handshake query when the socket connection is establish
 * @param socket connected socket instance
 */
export declare const getSocketIOHandshakeQuery: (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => SocketIOHandshakeQuery;
export declare const getSocketIOContext: (service: string, io: Server<DefaultEventsMap, DefaultEventsMap>, socket: Socket<DefaultEventsMap, DefaultEventsMap>) => SocketIOCtx | null;
