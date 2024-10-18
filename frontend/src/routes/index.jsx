import { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Layout from "../layouts";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";

const Login = lazy(() => import("../pages/LoginPage"));
const Register = lazy(() => import("../pages/RegisterPage"));

const AllRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Outlet />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<Layout />}>
                        <Route index element={<HomePage />} />

                        <Route
                            element={
                                <ProtectedRoute>
                                    <HomePage />
                                </ProtectedRoute>
                            }
                        ></Route>
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AllRoutes;
