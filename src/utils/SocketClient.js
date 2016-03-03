import { bindActionCreators } from "redux";
import objectAssign from "object-assign";

const STATE_CONNECTING = 0;
const STATE_OPEN = 1;
const STATE_CLOSING = 2;
const STATE_CLOSED = 3;

class SocketClient {
    constructor(callbacks) {
        this.callbacks = callbacks;
    }

    open(url) {
        if (this.socket && this.socket.readyState !== STATE_CLOSED) {
            throw new Error("SocketClient: socket already open");
        }
        this.socket = new WebSocket(url);
        objectAssign(this.socket, this.callbacks);
    }

    close() {
        this.socket.close();
    }

    send(message) {
        this.socket.send(message);
    }
}

export default SocketClient;
