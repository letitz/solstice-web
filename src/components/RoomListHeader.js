import React, { PropTypes } from "react";

const RoomListHeader = ({ refresh }) => {
    return (
        <div id="room-list-header">
            <div>
                <h2>Room List</h2>
            </div>
            <div>
                <button onClick={refresh}>Refresh</button>
            </div>
        </div>
    );
};

RoomListHeader.propTypes = {
    refresh: PropTypes.func.isRequired
};

export default RoomListHeader;
