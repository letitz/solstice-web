import React, {PropTypes} from "react";
import {reduxForm} from "redux-form";

const RoomChatForm = (props) => {
    const {
        fields: { message },
        handleSubmit,
        resetForm,
        roomName,
        sendMessage
    } = props;

    const onSubmit = handleSubmit((values) => {
        sendMessage(roomName, values.message);
        resetForm();
    });

    return (
        <div id="room-chat-form">
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Type a message..."
                    {...message} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

RoomChatForm.propTypes = {
    fields: PropTypes.shape({
        message: PropTypes.object.isRequired
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    roomName: PropTypes.string,
    sendMessage: PropTypes.func.isRequired
};

export default reduxForm({
    form: "chat",
    fields: ["message"]
})(RoomChatForm);

