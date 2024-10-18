import PropTypes from "prop-types";
import { LoaderIcon } from "lucide-react";

const Button = ({ children, type = "button", isLoading, disabled, onClick }) => {
    return (
        <button
            type={type}
            className="w-full py-2 px-4 flex items-center justify-center rounded-md shadow-sm font-medium text-white bg-sky-600 hover:bg-sky-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600 disabled:opacity-50"
            disabled={isLoading || disabled}
            onClick={onClick}
        >
            {isLoading ? (
                <>
                    <LoaderIcon className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                    Loading...
                </>
            ) : (
                <>{children}</>
            )}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    isLoading: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;
