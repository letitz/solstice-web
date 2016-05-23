const checkRequiredThenValidate = (validator) =>
    (props, propName, componentName, location) =>
{
    if (props[propName] != null) {
        return validator(props, propName, componentName, location);
    }

    return new Error(
        `Required prop \`${propName}\` was not specified in ` +
        `\`${componentName}\`.`
    );
};

export default (validator) => {
    validator.isRequired = checkRequiredThenValidate(validator);
    return validator;
};
