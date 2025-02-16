import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { registerAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";

// Define form values interface
interface RegistrationFormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// Define API response type
interface RegisterResponse {
    message: string;
    user: {
        id: string;
        username: string;
        email: string;
    };
}

// Validations
const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Passwords must match")
        .required("Confirming your password is required"),
});

const RegistrationForm: React.FC = () => {
    const navigate = useNavigate();

    // Mutation
    const { mutateAsync, isPending, isError, error, isSuccess } = useMutation<
        RegisterResponse,
        unknown,
        RegistrationFormValues
    >({
        mutationFn: registerAPI,
        mutationKey: ["register"],
    });

    const formik = useFormik<RegistrationFormValues>({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const data = await mutateAsync(values);
                console.log(data);
            } catch (e) {
                console.error(e);
            }
        },
    });

    // Redirect after success
    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        }
    }, [isSuccess, navigate]);

    return (

        <form
            onSubmit={formik.handleSubmit}
            className="max-w-md w-full pl-10  bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200"
        >
    <h2 className="text-3xl font-semibold text-center text-gray-800">Sign Up</h2>
    {
        isPending && <AlertMessage type="loading" message="Loading..."/>
    }
    {
        isError && (
                <AlertMessage type="error" message={(error as any)?.response?.data?.message || "An error occurred"} />
            )}
            {isSuccess && <AlertMessage type="success" message="Registration success" />}
            <p className="text-sm text-center text-gray-500">Join our community now!</p>

            <div className="relative">
                <FaUser className="absolute top-3 left-3 text-gray-700" />
                <input
                    id="username"
                    type="text"
                    {...formik.getFieldProps("username")}
                    placeholder="Username"
                    className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-600 text-black"
                />
                {formik.touched.username && formik.errors.username && <span className="text-xs text-red-500">{formik.errors.username}</span>}
            </div>

            <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-700" />
                <input
                    id="email"
                    type="email"
                    {...formik.getFieldProps("email")}
                    placeholder="Email"
                    className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-600 text-black"
                />
                {formik.touched.email && formik.errors.email && <span className="text-xs text-red-500">{formik.errors.email}</span>}
            </div>

            <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-700" />
                <input
                    id="password"
                    type="password"
                    {...formik.getFieldProps("password")}
                    placeholder="Password"
                    className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-600 text-black"
                />
                {formik.touched.password && formik.errors.password && <span className="text-xs text-red-500">{formik.errors.password}</span>}
            </div>

            <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-700" />
                <input
                    id="confirmPassword"
                    type="password"
                    {...formik.getFieldProps("confirmPassword")}
                    placeholder="Confirm Password"
                    className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-600 text-black"
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && <span className="text-xs text-red-500">{formik.errors.confirmPassword}</span>}
            </div>

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-white-200 via-purple-400 to-purple-900 hover:from-white-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
                Register
            </button>
        </form>
    );
};

export default RegistrationForm;
