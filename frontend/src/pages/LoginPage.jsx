import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LockIcon, LogInIcon, MailIcon } from "lucide-react";

import { useLoginMutation } from "../api/auth";
import InputWithIcon from "../components/form/InputWithIcon";
import Label from "../components/form/Label";
import Button from "../components/Button";

const LoginPage = () => {
    const { mutate: login, isPending } = useLoginMutation();
    const [userForm, setUserForm] = useState({ email: "", password: "" });

    const handleSubmit = (event) => {
        event.preventDefault();
        login(userForm);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col justify-center h-svh bg-gradient-to-br from-cyan-500 to-sky-800">
            <motion.div
                className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 sm:mx-auto sm:w-full sm:max-w-md"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
            >
                <h1 className="text-center text-3xl font-semibold tracking-tight text-gray-900">Welcome back!</h1>

                <section className="mt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <InputWithIcon
                                name="email"
                                id="email"
                                type="email"
                                placeholder="andrewsmith@me.com"
                                value={userForm.email}
                                onChange={handleChange}
                                required
                            >
                                <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </InputWithIcon>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <InputWithIcon
                                name="password"
                                id="password"
                                type="password"
                                placeholder="********"
                                value={userForm.password}
                                onChange={handleChange}
                                required
                            >
                                <LockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </InputWithIcon>
                        </div>

                        <Button type="submit" isLoading={isPending}>
                            <LogInIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                            Login
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-semibold leading-6 text-sky-600 hover:text-sky-500 transition duration-300 ease-in-out"
                        >
                            Sign up
                        </Link>
                    </p>
                </section>
            </motion.div>
        </div>
    );
};

export default LoginPage;
