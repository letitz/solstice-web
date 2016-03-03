import React, {PropTypes} from 'react';

const App = (props) => {
    const { onClick, socket } = props;
    return (
        <div>
            <h1>Solstice web UI</h1>
            <div>Socket state: {socket.state}</div>
            <button onClick={onClick}>
                Connect
            </button>
        </div>
    );
};

App.propTypes = {
    onClick: PropTypes.func.isRequired,
    socket: PropTypes.object.isRequired
};

export default App;
