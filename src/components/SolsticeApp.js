import React, {PropTypes} from "react";

import { STATE_OPEN } from "../constants/socket";
import { LOGIN_STATUS_SUCCESS } from "../constants/login";

import ConnectForm from  "./ConnectForm";
import Header from "./Header";
import LoginStatusPane from "./LoginStatusPane";

import Footer from "../containers/Footer";
import RoomsPane from "../containers/RoomsPane";

const ID = "solstice-app";

const SolsticeApp = (props) => {
    const { actions, login, socket } = props;
    if (socket.state !== STATE_OPEN ) {
        return (
            <div id={ID}>
                <ConnectForm socket={socket} actions={actions} />
            </div>
        );
    }

    if (login.status !== LOGIN_STATUS_SUCCESS) {
        return (
            <div id={ID}>
                <ConnectForm socket={socket} actions={actions} />
                <LoginStatusPane {...login} socketSend={actions.socket.send} />
            </div>
        );
    }

    return (
        <div id={ID}>
            <Header />
            <main>
                <RoomsPane roomActions={actions.room}/>
            </main>
            <Footer actions={actions} />
        </div>
    );
};

SolsticeApp.propTypes = {
    actions: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
};

export default SolsticeApp;
