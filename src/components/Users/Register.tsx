import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { registerAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";

// Define types
interface RegisterFormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface RegisterResponse {
    data: any; // Adjust based on actual API response structure
}

interface RegisterError {
    response: {
        data: {
            message: string;
        };
    };
}

// Validations
const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirming your password is required"),
});

const RegistrationForm: React.FC = () => {
    // Navigate
    const navigate = useNavigate();
    // Mutation
    const { mutateAsync, isPending, isError, error, isSuccess } = useMutation<
        RegisterResponse,
        RegisterError,
        RegisterFormValues
    >({
        mutationFn: registerAPI,
        mutationKey: ["register"],
    });

    const formik = useFormik<RegisterFormValues>({
        initialValues: {
            email: "",
            password: "",
            username: "",
            confirmPassword: "",
        },
        // Validations
        validationSchema,
        // Submit
        onSubmit: (values) => {
            console.log(values);
            // HTTP request
            mutateAsync(values)
                .then((data) => {
                    console.log(data);
                })
                .catch((e) => console.log(e));
        },
    });

    // Redirect
    useEffect(() => {
        setTimeout(() => {
            if (isSuccess) {
                navigate("/login");
            }
        }, 3000);
    }, [isPending, isError, error, isSuccess]);

    return (
        <form
            onSubmit={formik.handleSubmit}
            className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200 "
        >
            <h2 className="text-3xl font-semibold text-center text-purple-800">
                Sign Up
            </h2>
            {/* Display messages */}
            {isPending && <AlertMessage type="loading" message="Loading...." />}
            {isError && (
                <AlertMessage type="error" message={(error as RegisterError).response.data.message} />
            )}
            {isSuccess && (
                <AlertMessage type="success" message="Registration success" />
            )}
            <p className="text-sm text-center text-black">
                Join our community now!
            </p>

            {/* Input Field - Username */}
            <div className="relative ">
                <FaUser className="absolute top-3 left-3 text-purple-400" />
                <input
                    id="username"
                    type="text"
                    {...formik.getFieldProps("username")}
                    placeholder="Username"
                    className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder-purple-600"
                />
                {formik.touched.username && formik.errors.username && (
                    <span className="text-xs text-red-500">{formik.errors.username}</span>
                )}
            </div>

            {/* Input Field - Email */}
            <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-purple-400" />
                <input
                    id="email"
                    type="email"
                    {...formik.getFieldProps("email")}
                    placeholder="Email"
                    className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder-purple-600"
                />
                {formik.touched.email && formik.errors.email && (
                    <span className="text-xs text-red-500">{formik.errors.email}</span>
                )}
            </div>

            {/* Input Field - Password */}
            <div className="relative">
                <FaLock className="absolute top-3 left-3 text-purple-400" />
                <input
                    id="password"
                    type="password"
                    {...formik.getFieldProps("password")}
                    placeholder="Password"
                    className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder-purple-600"
                />
                {formik.touched.password && formik.errors.password && (
                    <span className="text-xs text-red-500">{formik.errors.password}</span>
                )}
            </div>

            {/* Input Field - Confirm Password */}
            <div className="relative">
                <FaLock className="absolute top-3 left-3 text-purple-400" />
                <input
                    id="confirmPassword"
                    type="password"
                    {...formik.getFieldProps("confirmPassword")}
                    placeholder="Confirm Password"
                    className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder-purple-600 text-black"
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <span className="text-xs text-red-500">
            {formik.errors.confirmPassword}
          </span>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-700 via-purple-600 to-purple-900 hover:from-purple-400 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
                Register
            </button>
        </form>
    );
};

export default RegistrationForm;