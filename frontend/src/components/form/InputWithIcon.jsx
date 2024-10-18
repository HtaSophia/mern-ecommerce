import PropTypes from "prop-types";

const InputWithIcon = ({ children: icon, name, id, type = "text", placeholder, value, onChange, required }) => {
    return (
        <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">{icon}</div>
            <input
                name={name}
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
        </div>
    );
};

InputWithIcon.propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string || PropTypes.number,
    onChange: PropTypes.func,
    required: PropTypes.bool,
};

export default InputWithIcon;
