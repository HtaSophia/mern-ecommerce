import PropTypes from "prop-types";
import { Navigate } from "react-router";
import { useUserStore } from "../../stores/useUserStore";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useUserStore((state) => state.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
    children: PropTypes.element,
};

export default ProtectedRoute;
