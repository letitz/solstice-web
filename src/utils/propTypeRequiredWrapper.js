const checkRequiredThenValidate = (validator) =>
    (props, propName, componentName, ...rest) =>
{
    if (props[propName] !== null) {
        return validator(props, propName, componentName, ...rest);
    }
    return new Error(
        `Missing prop \`${propName}\` not supplied to \`${componentName}\``
    );
};

export default (validator) => {
    validator.isRequired = checkRequiredThenValidate(validator);
    return validator;
};
