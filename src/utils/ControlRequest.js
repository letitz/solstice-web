export default {
    loginStatus: () => ({
        "variant": "LoginStatusRequest",
        "fields": []
    }),

    roomList: () => ({
        "variant": "RoomListRequest",
        "fields": []
    }),

    joinRoom: (room) => ({
        "variant": "JoinRoomRequest",
        "fields": [{ room }]
    })
};
