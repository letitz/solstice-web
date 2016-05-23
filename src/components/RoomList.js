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

        for (const [room_name, room_data] of roomMap) {
            const onClick = (event) => {
                roomActions.select(room_name);
            };

            children.push(
                <li key={room_name}>
                    <Room
                        onClick={onClick}
                        name={room_name}
                        room={room_data}
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
