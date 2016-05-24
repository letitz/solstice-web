import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImmutablePropTypes from "react-immutable-proptypes";

import UserActions from "../actions/UserActions";

import UserList from "../components/UserList";

const UsersPane = ({ users, userActions }) => {
    return (
        <div id="users-pane">
            <UserList users={users} userActions={userActions} />
        </div>
    );
};

UsersPane.propTypes = {
    users:       ImmutablePropTypes.record.isRequired,
    userActions: PropTypes.object.isRequired
};

const mapStateToProps = ({ users }) => ({ users });

const mapDispatchToProps = (dispatch) => ({
    userActions: bindActionCreators(UserActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersPane);
