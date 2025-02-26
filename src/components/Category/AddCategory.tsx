import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaWallet } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addCategoryAPI } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

type CategoryType = "income" | "expense";

interface CategoryFormValues {
    type: CategoryType | "";
    name: string;
}

const validationSchema = Yup.object({
    name: Yup.string().required("Category name is required"),
    type: Yup.string()
        .required("Category type is required")
        .oneOf(["income", "expense"] as const),
});

const AddCategory: React.FC = () => {
    const navigate = useNavigate();

    const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
        mutationFn: addCategoryAPI,
        mutationKey: ["addCategory"],
    });

    const formik = useFormik<CategoryFormValues>({
        initialValues: {
            type: "",
            name: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const newCategory = await mutateAsync(values);
                // Log the category ID after successful mutation
                console.log("New category:", newCategory);
                if (newCategory && newCategory._id) {
                    console.log("Category ID:", newCategory._id);
                } else {
                    console.log("Category ID is undefined");
                }
                navigate("/categories");
            } catch (e) {
                console.error(e);
            }
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="max-w-lg mx-auto my-10 bg-white p-6 rounded-lg shadow-lg space-y-6"
        >
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800">Add New Category</h2>
                <p className="text-gray-600">Fill in the details below.</p>
            </div>
            {isError && (
                <AlertMessage
                    type="error"
                    message={
                        (error as any)?.response?.data?.message ||
                        "Something happened, please try again later"
                    }
                />
            )}
            {isSuccess && <AlertMessage type="success" message="Category added successfully, redirecting..." />}
            <div className="space-y-2">
                <label htmlFor="type" className="flex gap-2 items-center text-gray-700 font-medium">
                    <FaWallet className="text-[#9C27B0]" />
                    <span>Type</span>
                </label>
                <select
                    {...formik.getFieldProps("type")}
                    id="type"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                >
                    <option value="" className="bg-[#9C27B0] text-white">Select transaction type</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                {formik.touched.type && formik.errors.type && <p className="text-red-500 text-xs">{formik.errors.type}</p>}
            </div>
            <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-700 font-medium">
                    <SiDatabricks className="inline mr-2 text-[#9C27B0]" />
                    Name
                </label>
                <input
                    type="text"
                    {...formik.getFieldProps("name")}
                    placeholder="Name"
                    id="name"
                    className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-3"
                />
                {formik.touched.name && formik.errors.name && <p className="text-red-500 text-xs italic">{formik.errors.name}</p>}
            </div>
            <button
                type="submit"
                className="mt-4 bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 transform"
                disabled={isPending}
            >
                {isPending ? "Adding..." : "Add Category"}
            </button>
        </form>
    );
};

export default AddCategory;

//add category