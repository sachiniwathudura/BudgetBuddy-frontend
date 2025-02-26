import React from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { changePasswordAPI } from "../../services/users/userService";
import { logoutAction } from "../../redux/slice/authSlice";
import AlertMessage from "../Alert/AlertMessage";

// Define types
interface UpdatePasswordFormValues {
    password: string;
}

interface ChangePasswordResponse {
    data: any;
}

interface ChangePasswordError {
    response: {
        data: {
            message: string;
        };
    };
}

// Validation schema
const validationSchema = Yup.object({
    password: Yup.string()
        .min(5, "Password must be at least 5 characters long")
        .required("Password is required"),
});

const UpdatePassword: React.FC = () => {
    const dispatch = useDispatch();

    const { mutateAsync, isPending, isError, error, isSuccess } = useMutation<
        ChangePasswordResponse,
        ChangePasswordError,
        string
    >({
        mutationFn: changePasswordAPI,
        mutationKey: ["change-password"],
    });

    const formik = useFormik<UpdatePasswordFormValues>({
        initialValues: {
            password: "",
        },
        validationSchema,
        onSubmit: (values) => {
            mutateAsync({ newPassword: values.password })
                .then(() => {
                    dispatch(logoutAction());
                    localStorage.removeItem("userInfo");
                })
                .catch((e) => console.log(e));
        },
    });

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-[#F8F9FA] rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#9C27B0] mb-4">Change Your Password</h2>
            <form onSubmit={formik.handleSubmit} className="w-full max-w-xs">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#2C3E50] mb-2" htmlFor="new-password">
                        New Password
                    </label>
                    {isPending && <AlertMessage type="loading" message="Updating...." />}
                    {isError && (
                        <AlertMessage type="error" message={(error as ChangePasswordError).response.data.message} />
                    )}
                    {isSuccess && (
                        <AlertMessage type="success" message="Password updated successfully" />
                    )}
                    <div className="flex items-center border-2 border-[#9C27B0] py-2 px-3 rounded">
                        <AiOutlineLock className="text-[#2C3E50] mr-2" />
                        <input
                            id="new-password"
                            type="password"
                            name="password"
                            {...formik.getFieldProps("password")}
                            className="outline-none flex-1 bg-transparent text-[#2C3E50]"
                            placeholder="Enter new password"
                        />
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <span className="text-xs text-[#E74C3C]">{formik.errors.password}</span>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#9C27B0] hover:bg-[#BA68C8] text-white font-bold py-2 px-4 rounded transition"
                >
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default UpdatePassword;