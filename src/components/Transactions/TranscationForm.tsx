import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    FaDollarSign,
    FaCalendarAlt,
    FaRegCommentDots,
    FaWallet,
} from "react-icons/fa";
import { listCategoriesAPI } from "../../services/category/categoryService.ts";
import { addTransactionAPI } from "../../services/transactions/transactionService.ts";
import AlertMessage from "../Alert/AlertMessage";

// Define types for category and form values
interface Category {
    id: number;
    name: string;
}

interface TransactionFormValues {
    type: "income" | "expense";
    amount: string;
    categoryId: number;
    date: string;
    description: string;
}

const validationSchema = Yup.object({
    type: Yup.string()
        .required("Transaction type is required")
        .oneOf(["income", "expense"]),
    amount: Yup.number()
        .required("Amount is required")
        .positive("Amount must be positive"),
    categoryId: Yup.number().required("Categoryid is required").positive("CategoryId is required"),
    date: Yup.date().required("Date is required"),
    description: Yup.string(),
});

const TransactionForm: React.FC = () => {
    const navigate = useNavigate();

    const {
        mutateAsync,
        isPending,
        isError: isAddTranErr,
        error: transErr,
        isSuccess,
    } = useMutation({
        mutationFn: addTransactionAPI,
        mutationKey: ["add-transaction"],
    });

    const {
        data: categories,
        isError,
        isLoading,
        error,
        refetch,
    } = useQuery<Category[], Error>({
        queryFn: listCategoriesAPI,
        queryKey: ["list-categories"],
    });

    const formik = useFormik<TransactionFormValues>({
        initialValues: {
            type: "",
            amount: "",
            categoryId: 0,
            date: "",
            description: "",
        },
        validationSchema,
        onSubmit: (values) => {
            const payload = {
                ...values,
                amount: parseFloat(values.amount), // Convert amount to number
                date: new Date(values.date).toISOString(), // Ensure proper date format
                categoryId: parseInt(values.categoryId, 10), // Send categoryId instead of category
            };

            mutateAsync(payload)
                .then((data) => {
                    console.log(data);
                    navigate("/transactions"); // Navigate after success
                })
                .catch((e) => {
                    console.error("Error:", e.response?.data || e.message);
                });
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="max-w-lg mx-auto my-10 bg-white p-6 rounded-lg shadow-lg space-y-6"
        >
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Transaction Details
                </h2>
                <p className="text-gray-600">Fill in the details below.</p>
            </div>

            {isError && (
                <AlertMessage
                    type="error"
                    message={
                        error?.response?.data?.message ||
                        "Something happened, please try again later"
                    }
                />
            )}
            {isSuccess && (
                <AlertMessage type="success" message="Transaction added successfully" />
            )}

            {/* Transaction Type Field */}
            <div className="space-y-2">
                <label
                    htmlFor="type"
                    className="flex gap-2 items-center text-gray-700 font-medium"
                >
                    <FaWallet className="text-[#9C27B0]" />
                    <span>Type</span>
                </label>
                <select
                    {...formik.getFieldProps("type")}
                    id="type"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                >
                    <option value="" className="bg-[#9C27B0] text-white">Select transaction type</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                {formik.touched.type && formik.errors.type && (
                    <p className="text-red-500 text-xs">{formik.errors.type}</p>
                )}
            </div>

            {/* Amount Field */}
            <div className="flex flex-col space-y-1">
                <label htmlFor="amount" className="text-gray-700 font-medium">
                    <FaDollarSign className="inline mr-2 text-[#9C27B0]" />
                    Amount
                </label>
                <input
                    type="number"
                    {...formik.getFieldProps("amount")}
                    id="amount"
                    placeholder="Amount"
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                />
                {formik.touched.amount && formik.errors.amount && (
                    <p className="text-red-500 text-xs italic">{formik.errors.amount}</p>
                )}
            </div>

            {/* Category Field */}
            <div className="space-y-2">
                <label
                    htmlFor="categoryId"
                    className="flex gap-2 items-center text-gray-700 font-medium"
                >
                    <FaRegCommentDots className="text-[#9C27B0]" />
                    <span>Category</span>
                </label>
                <select
                    {...formik.getFieldProps("categoryId")}
                    id="categoryId"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                >
                    <option value="" className=" bg-[#9C27B0] text-white">Select category</option>
                    {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {formik.touched.categoryId && formik.errors.categoryId && (
                    <p className="text-red-500 text-xs">{formik.errors.categoryId}</p>
                )}
            </div>

            {/* Date Field */}
            <div className="space-y-2">
                <label
                    htmlFor="date"
                    className="flex gap-2 items-center text-gray-700 font-medium"
                >
                    <FaCalendarAlt className="text-[#9C27B0]" />
                    <span>Date</span>
                </label>
                <input
                    type="date"
                    {...formik.getFieldProps("date")}
                    id="date"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                />
                {formik.touched.date && formik.errors.date && (
                    <p className="text-red-500 text-xs">{formik.errors.date}</p>
                )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
                <label
                    htmlFor="description"
                    className="flex gap-2 items-center text-gray-700 font-medium"
                >
                    <FaRegCommentDots className="text-[#9C27B0]" />
                    <span>Description</span>
                </label>
                <input
                    type="text"
                    {...formik.getFieldProps("description")}
                    id="description"
                    placeholder="Description"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                />
                {formik.touched.description && formik.errors.description && (
                    <p className="text-red-500 text-xs italic">{formik.errors.description}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="mt-4 bg-[#9C27B0] hover:bg-[#BA68C8] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 transform"
                disabled={isPending}
            >
                {isPending ? "Adding..." : "Add Transaction"}
            </button>
        </form>
    );
};

export default TransactionForm;