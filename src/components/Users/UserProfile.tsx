import React from "react";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import UpdatePassword from "./UpdatePassword";
import { updateProfileAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";

interface FormValues {
    email: string;
    username: string;
}

const UserProfile: React.FC = () => {
    // Mutation
    const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
        mutationFn: updateProfileAPI,
        mutationKey: ["update-profile"],
    });

    const formik = useFormik<FormValues>({
        initialValues: {
            email: "",
            username: "",
        },
        // Submit
        onSubmit: (values) => {
            mutateAsync(values)
                .then((data) => {
                    console.log(data);
                })
                .catch((e) => console.log(e));
        },
    });

    return (
        <>
            <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
                <h1 className="mb-2 text-3xl text-center font-extrabold">
                    Welcome
                    {/* <span className="text-gray-500 text-sm ml-2">info@gmail.com</span> */}
                </h1>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Update Profile
                </h3>
                {/* Display message */}
                {isPending && <AlertMessage type="loading" message="Updating...." />}
                {isError && (
                    <AlertMessage type="error" message={(error as any).response.data.message} />
                )}
                {isSuccess && (
                    <AlertMessage type="success" message="Updated successfully" />
                )}
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* User Name Field */}
                    <div className="flex items-center space-x-4">
                        <FaUserCircle className="text-3xl text-[#9C27B0]" />
                        <div className="flex-1">
                            <label
                                htmlFor="username"
                                className="text-sm font-medium text-gray-700"
                            >
                                Username
                            </label>
                            <input
                                {...formik.getFieldProps("username")}
                                type="text"
                                id="username"
                                className="mt-1 block w-full border-2 border-[#9C27B0] rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Your username"
                            />
                        </div>
                        {formik.touched.username && formik.errors.username && (
                            <span className="text-xs text-red-500">
                {formik.errors.username}
              </span>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="flex items-center space-x-4 ">
                        <FaEnvelope className="text-3xl text-[#9C27B0]" />
                        <div className="flex-1">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...formik.getFieldProps("email")}
                                className="mt-1 block w-full border-2 border-[#9C27B0] rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Your email"
                            />
                        </div>
                        {formik.touched.email && formik.errors.email && (
                            <span className="text-xs text-red-500">
                {formik.errors.email}
              </span>
                        )}
                    </div>

                    {/* Save Changes Button */}
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="bg-[#9C27B0] hover:bg-[#BA68C8] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
            <UpdatePassword />
        </>
    );
};

export default UserProfile;
