import React, { PropTypes } from "react";

import Room from "./Room";
import RoomListHeader from "./RoomListHeader";

class RoomList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.roomActions.getList();
    }

    render() {
        const { selected, roomMap, roomActions } = this.props;

        const children = [];

        for (const [roomName, roomData] of roomMap) {
            children.push(
                <li key={roomName}>
                    <Room
                        name={roomName}
                        room={roomData}
                    />
                </li>
            );
        }

        return (
            <div id="room-list">
                <RoomListHeader refresh={this.props.roomActions.getList}/>
                <ul> {children} </ul>
            </div>
        );
    }
}

RoomList.propTypes = {
    roomMap: PropTypes.object.isRequired,
    roomActions: PropTypes.shape({
        getList: PropTypes.func.isRequired
    }).isRequired,
    selected: PropTypes.string
};

export default RoomList;
