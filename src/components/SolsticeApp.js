import React, {PropTypes} from "react";

import Header from "./Header";

import Footer from "../containers/Footer";

const SolsticeApp = ({ children }) => (
    <div id="solstice-app">
        <Header />
        <main>
            {children}
        </main>
        <Footer />
    </div>
);

SolsticeApp.propTypes = {
    children: PropTypes.element
};

export default SolsticeApp;
