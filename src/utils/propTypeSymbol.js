import propTypeRequiredWrapper from "./propTypeRequiredWrapper";

// Simple validator for Symbols (instanceof does not work on symbols).
function propTypeSymbol(props, propName, componentName) {
    const prop = props[propName];
    if (prop === null) {
        return;
    }
    const type = typeof prop;
    if (type === "symbol") {
        return;
    }
    return new Error(
        `Invalid prop \`${propName}\` of type \`${type}\` ` +
        `supplied to \`${componentName}\`, expected \`symbol\``
    );
}

export default propTypeRequiredWrapper(propTypeSymbol);

