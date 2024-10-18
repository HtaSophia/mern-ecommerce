import { create } from "zustand";

export const useUserStore = create(() => ({
    user: null,
    isAuthenticated: false,
    isAdmin: false,
}));

export const updateUser = (user) => {
    useUserStore.setState({
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
    });
};
