export default {
    login: (username, password) => ({
        "variant": "LoginRequest",
        "fields": [{
            "username": username,
            "password": password,
        }]
    })
};
