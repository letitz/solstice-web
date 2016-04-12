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

    roomMessage: (room_name, message) => ({
        variant: "RoomMessageRequest",
        fields: [{
            room_name,
            message
        }]
    })
};
