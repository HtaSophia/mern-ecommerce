import PropTypes from "prop-types";

const Input = ({ name, type = "text", placeholder, value, onChange }) => {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-sky-600 sm:text-sm sm:leading-6"
        />
    );
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string || PropTypes.number,
    onChange: PropTypes.func,
};

export default Input;
