import objectAssign from 'object-assign';

const initialState = {
    socketConnected: false,
    clientConnected: false,
    loggedIn: false
};

export default function solsticeAppState(state = initialState, action) {
    return state;
}
