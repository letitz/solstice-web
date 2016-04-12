export default {
    loginStatus: () => ({
        variant: "LoginStatusRequest",
        fields: []
    }),

    roomJoin: (room) => ({
        variant: "RoomJoinRequest",
        fields: [room]
    }),

    roomList: () => ({
        variant: "RoomListRequest",
        fields: []
    }),

    roomMessage: (room_name, message) => ({
        variant: "RoomMessageRequest",
        fields: [{
            room_name,
            message
        }]
    })
};
