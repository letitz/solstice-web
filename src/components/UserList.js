import React, { PropTypes } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

import SearchableList from "./SearchableList";
import User from "./User";

const ComposedSearchableList = SearchableList(User);

const UserList = ({ users, userActions }) => (
    <ComposedSearchableList
        id="user-list"
        itemMap={users}
        refresh={userActions.getList}
    />
);

UserList.propTypes = {
    users: ImmutablePropTypes.record.isRequired,
    userActions: PropTypes.object.isRequired
};

export default UserList;
