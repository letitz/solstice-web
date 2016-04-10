export default {
    joinRoom: (room) => ({
        variant: "JoinRoomRequest",
        fields: [room]
    }),

    loginStatus: () => ({
        variant: "LoginStatusRequest",
        fields: []
    }),

    roomList: () => ({
        variant: "RoomListRequest",
        fields: []
    }),

    sayRoom: (room_name, message) => ({
        variant: "SayRoomRequest",
        fields: [{
            room_name,
            message
        }]
    })
};
