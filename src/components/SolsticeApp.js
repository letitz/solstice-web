import React, {PropTypes} from "react";

import ConnectForm from  "./ConnectForm";
import Header from "./Header";

import RoomsPane from "../containers/RoomsPane";
import Footer from "../containers/Footer";

import { STATE_OPEN } from "../constants/socket";

const ID = "solstice-app";

const SolsticeApp = (props) => {
    const { actions, socket } = props;
    if (socket.state !== STATE_OPEN ) {
        return (
            <div id={ID}>
                <ConnectForm socket={socket} actions={actions} />
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
    socket: PropTypes.object.isRequired
};

export default SolsticeApp;
