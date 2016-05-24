import React, { PropTypes } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

import Room from "./Room";
import SearchableList from "./SearchableList";

const ComposedSearchableList = SearchableList(Room);

const RoomList = ({ rooms, roomActions }) => (
    <ComposedSearchableList
        id="room-list"
        itemMap={rooms}
        refresh={roomActions.getList}
    />
);

RoomList.propTypes = {
    rooms: ImmutablePropTypes.record.isRequired,
    roomActions: PropTypes.shape({
        getList: PropTypes.func.isRequired
    }).isRequired
};

export default RoomList;
