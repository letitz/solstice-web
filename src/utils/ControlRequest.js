export default {
    loginStatus: () => ({
        variant: "LoginStatusRequest",
        fields: []
    }),

    roomJoin: (room_name) => ({
        variant: "RoomJoinRequest",
        fields: [room_name]
    }),

    roomLeave: (room_name) => ({
        variant: "RoomLeaveRequest",
        fields: [room_name]
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
    }),

    userList: () =>({
        variant: "UserListRequest",
        fields: []
    })
};
