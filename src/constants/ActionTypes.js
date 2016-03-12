// Socket actions
export const SOCKET_SET_OPEN = Symbol("SOCKET_SET_OPEN");
export const SOCKET_SET_OPENING = Symbol("SOCKET_SET_OPENING");
export const SOCKET_SET_CLOSED = Symbol("SOCKET_SET_CLOSED");
export const SOCKET_SET_CLOSING = Symbol("SOCKET_SET_CLOSING");
export const SOCKET_SET_ERROR = Symbol("SOCKET_SET_ERROR");
export const SOCKET_RECEIVE_MESSAGE = Symbol("SOCKET_RECEIVE_MESSAGE");
export const SOCKET_SEND_MESSAGE = Symbol("SOCKET_SEND_MESSAGE");

// Room actions
export const ROOM_SELECT = Symbol("ROOM_SELECT");