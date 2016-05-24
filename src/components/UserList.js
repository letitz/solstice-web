import React, { PropTypes } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

import User from "./User";

class UserList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { users, userActions } = this.props;
        if (users.shouldUpdate()) {
            userActions.getList();
        }
    }

    render() {
        const { users, userActions } = this.props;
        let children = [];
        for (const [ userName, userData ] of users.byName) {
            children.push(
                <li key={userName}>
                    <User name={userName} />
                </li>
            );
        }

        const onClick = (event) => {
            event.preventDefault();
            userActions.getList();
        };

        return (
            <div className="user-list">
                <button onClick={onClick}>Refresh</button>
                <ul>
                    {children}
                </ul>
            </div>
        );
    }
}

UserList.propTypes = {
    users: ImmutablePropTypes.record.isRequired,
    userActions: PropTypes.object.isRequired
};

export default UserList;
