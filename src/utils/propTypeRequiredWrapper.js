const checkRequiredThenValidate = (validator) =>
    (props, propName, componentName, location) =>
{
    if (props[propName] !== null) {
        return validator(props, propName, componentName, location);
    }

    /* global ReactPropTypesLocationNames */ // Pacify ESLint
    const location_name = ReactPropTypesLocationNames[location];

    return new Error(
        `Required prop \`${propName}\` was not specified in ` +
        `\`${componentName}\`. Check the render method of \`${location_name}\`.`
    );
};

export default (validator) => {
    validator.isRequired = checkRequiredThenValidate(validator);
    return validator;
};
