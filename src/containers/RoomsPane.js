import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import RoomList from "../components/RoomList";

import RoomChat from "../containers/RoomChat";

import ControlRequest from "../utils/ControlRequest";

class RoomsPane extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="rooms-pane">
                <RoomList
                    rooms={this.props.rooms}
                    roomActions={this.props.actions.room}
                    selected={this.props.selected}
                />
                <RoomChat />
            </div>
        );
    }
}

RoomsPane.propTypes = {
    actions: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired
};

const mapStateToProps = (state) => state.rooms;

export default connect(
    mapStateToProps,
)(RoomsPane);
