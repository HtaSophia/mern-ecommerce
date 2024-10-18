import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import axios from "../lib/axios";
import apiRoutes from "./apiRoutes";
import { updateUser } from "../stores/useUserStore";
import { errorMessageHandler } from "../utils/errorMessageHandler";

const register = async (user) => {
    const { data } = await axios.post(apiRoutes.REGISTER, user);
    return data;
};

const login = async (user) => {
    const { data } = await axios.post(apiRoutes.LOGIN, user);
    return data;
};

const logout = async () => await axios.post(apiRoutes.LOGOUT);

export const useRegisterMutation = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (user) => register(user),
        onSuccess: (user) => {
            updateUser(user);
            navigate("/");
            toast.success("Registration successful");
        },
        onError: (error) => {
            toast.error(errorMessageHandler(error));
        },
    });
};

export const useLoginMutation = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (user) => login(user),
        onSuccess: ({ user, message }) => {
            updateUser(user);
            navigate("/");
            toast.success(message);
        },
        onError: (error) => {
            toast.error(errorMessageHandler(error));
        },
    });
};

export const useLogoutMutation = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            updateUser(null);
            navigate("/");
        },
    });
};
