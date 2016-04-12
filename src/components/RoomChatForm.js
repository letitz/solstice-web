import React, {PropTypes} from "react";
import {reduxForm} from "redux-form";

const RoomChatForm = (props) => {
    const { fields: { message }, handleSubmit, name, sendMessage } = props;

    const onSubmit = handleSubmit((values) => {
        sendMessage(name, values.message);
    });

    return (
        <div id="room-chat-form">
            <form onSubmit={onSubmit}>
                <input type="text" defaultValue="Type a message..."
                    {...message} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

RoomChatForm.propTypes = {
    fields: PropTypes.shape({
        message: PropTypes.string.isRequired
    }),
    handleSubmit: PropTypes.func.isRequired,
    name: PropTypes.string,
    sendMessage: PropTypes.func.isRequired
};

export default reduxForm({
    form: "chat",
    fields: ["message"]
})(RoomChatForm);

