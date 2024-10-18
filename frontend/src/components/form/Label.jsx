import PropTypes from "prop-types";

const Label = ({ children }) => {
    return <label className="block text-sm font-medium text-gray-700">{children}</label>;
};

Label.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Label;
