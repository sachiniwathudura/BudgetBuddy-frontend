import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";
import { loginAction } from "../../redux/slice/authSlice";

// Define the shape of form values
interface LoginFormValues {
    email: string;
    password: string;
}

// Define the response type for loginAPI (adjust as per your API response)
interface LoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

//! Validations
const validationSchema = Yup.object({
    email: Yup.string().email("Invalid").required("Email is required"),
    password: Yup.string()
        .min(5, "Password must be at least 5 characters long")
        .required("Password is required"),
});

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Mutation
    const { mutateAsync, isPending, isError, error, isSuccess } = useMutation<
        LoginResponse,
        unknown,
        LoginFormValues
    >({
        mutationFn: loginAPI,
        mutationKey: ["login"],
    });

    const formik = useFormik<LoginFormValues>({
        initialValues: {
            email: "ben@gmail.com",
            password: "123456",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const data = await mutateAsync(values);
                dispatch(loginAction(data));
                localStorage.setItem("userInfo", JSON.stringify(data));
            } catch (e) {
                console.error(e);
            }
        },
    });

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                navigate("/profile");
            }, 3000);
        }
    }, [isSuccess, navigate]);

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200"
        >
            <h2 className="text-3xl font-semibold text-center text-gray-800">Login</h2>

            {/* Display messages */}
            {isPending && <AlertMessage type="loading" message="Logging you in..." />}
            {isError && (
                <AlertMessage
                    type="error"
                    message={(error as any)?.response?.data?.message || "An error occurred"}
                />
            )}
            {isSuccess && <AlertMessage type="success" message="Login successful" />}

            <p className="text-sm text-center text-gray-500">Login to access your account</p>

            {/* Input Field - Email */}
            <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-700" />
                <input
                    id="email"
                    type="email"
                    {...formik.getFieldProps("email")}
                    placeholder="Email"
                    className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-600 text-black"
                />
                {formik.touched.email && formik.errors.email && (
                    <span className="text-xs text-red-500">{formik.errors.email}</span>
                )}
            </div>

            {/* Input Field - Password */}
            <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-700" />
                <input
                    id="password"
                    type="password"
                    {...formik.getFieldProps("password")}
                    placeholder="Password"
                    className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-600 text-black"
                />
                {formik.touched.password && formik.errors.password && (
                    <span className="text-xs text-red-500">{formik.errors.password}</span>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-gradient-to-r from-white-200 via-purple-400 to-purple-900 hover:from-white-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
                Login
            </button>
        </form>
    );
};

export default LoginForm;