import PropTypes from "prop-types";
import Navbar from "./components/Navbar";

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Layout;
