import React, {PropTypes} from "react";
import {reduxForm} from "redux-form";

const RoomChatForm = (props) => {
    const { fields: { message }, handleSubmit, name, say } = props;

    const onSubmit = handleSubmit((values) => {
        say(name, values.message);
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
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    name: PropTypes.string,
    say: PropTypes.func.isRequired
};

export default reduxForm({
    form: "chat",
    fields: ["message"]
})(RoomChatForm);

