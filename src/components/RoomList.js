import React, { PropTypes } from "react";

import Room from "./Room";
import RoomListHeader from "./RoomListHeader";

class RoomList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.roomActions.getRoomList();
    }

    render() {
        const { selected, rooms, roomActions } = this.props;

        const children = [];

        console.log(`Selected: "${selected}"`);
        for (const [room_name, room_data] of rooms) {
            const onClick = (event) => {
                roomActions.select(room_name);
                if (!room_data.joined) {
                    roomActions.join(room_name);
                }
            };

            children.push(
                <li key={room_name}>
                    <Room onClick={onClick} name={room_name} {...room_data}
                        isSelected={selected == room_name} />
                </li>
            );
        }

        return (
            <div id="room-list">
                <RoomListHeader refresh={this.props.roomActions.getRoomList}/>
                <ul> {children} </ul>
            </div>
        );
    }
}

RoomList.propTypes = {
    rooms: PropTypes.object.isRequired,
    roomActions: PropTypes.object.isRequired,
    selected: PropTypes.string
};

export default RoomList;
