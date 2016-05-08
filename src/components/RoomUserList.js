import React, { PropTypes } from "react";

const RoomUserList = ({ users }) => {
    // Append all users
    const children = [];
    let i = 0;
    for (const user of users) {
        children.push(
            <li key={i} className="room-user">
                {user}
            </li>
        );
        i++;
    }

    return <ul id="room-user-list">{children}</ul>;
};

RoomUserList.propTypes = {
    users: PropTypes.arrayOf(
       PropTypes.string.isRequired
    ).isRequired
};

export default RoomUserList;
