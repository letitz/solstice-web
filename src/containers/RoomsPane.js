import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import RoomList from "../components/RoomList";

import RoomChat from "../containers/RoomChat";

import roomActions from "../actions/roomActions";

import ControlRequest from "../utils/ControlRequest";

class RoomsPane extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.socketSend(ControlRequest.roomList());
    }

    render() {
        const refresh = () => {
            this.props.socketSend(ControlRequest.roomList());
        };

        return (
            <div id="rooms-pane">
                <RoomChat />
                <RoomList
                    rooms={this.props.rooms}
                    refresh={refresh}
                    roomActions={this.props.roomActions}/>
            </div>
        );
    }
}

RoomsPane.propTypes = {
    rooms: PropTypes.object.isRequired,
    roomActions: PropTypes.object.isRequired,
    socketSend: PropTypes.func.isRequired
};

const mapStateToProps = (state) => state.rooms;

const mapDispatchToProps = (dispatch) => ({
    roomActions: bindActionCreators(roomActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomsPane);
