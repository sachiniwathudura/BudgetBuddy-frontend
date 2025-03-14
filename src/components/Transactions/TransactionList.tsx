import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { listTransactionsAPI } from "../../services/transactions/transactionService.ts";
import { listCategoriesAPI } from "../../services/category/categoryService";

interface Transaction {
    id: string;
    type: "income" | "expense";
    amount: number;
    category: {
        name: string;
    };
    date: string;
    description?: string;
}

interface Filter {
    startDate: string;
    endDate: string;
    type: "income" | "expense" | "";
    category: string;
}

const TransactionList: React.FC = () => {
    //!Filtering state
    const [filters, setFilters] = useState<Filter>({
        startDate: "",
        endDate: "",
        type: "",
        category: "",
    });

    //!Handle Filter Change
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    // Fetching categories data
    const {
        data: categoriesData,
        isLoading: categoryLoading,
        error: categoryErr,
    } = useQuery({
        queryFn: listCategoriesAPI,
        queryKey: ["list-categories"],
    });

    // Fetching transactions data based on filters
    const {
        data: transactions,
        isError,
        isLoading,
        error,
        refetch,
    } = useQuery<Transaction[]>({
        queryFn: () => listTransactionsAPI(filters),
        queryKey: ["list-transactions", filters],
    });

    const handleDelete = async (transactionId: string) => {
        try {
            // Call your delete function here (e.g., deleteTransactionAPI)
            console.log("Deleting transaction with ID:", transactionId);
            refetch(); // Refetch the data after delete
        } catch (err) {
            console.error("Error deleting transaction:", err);
        }
    };

    const handleUpdateTransaction = (transactionId: string) => {
        // Handle updating the transaction
        console.log("Updating transaction with ID:", transactionId);
    };

    // Error handling for categories and transactions
    if (categoryErr || isError) {
        return <div>Error loading data...</div>;
    }

    // Loading state
    if (isLoading || categoryLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Start Date */}
                <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                {/* End Date */}
                <input
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    type="date"
                    name="endDate"
                    className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                {/* Type */}
                <div className="relative">
                    <select
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                        className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
                    >
                        <option value="">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                {/* Category */}
                <div className="relative">
                    <select
                        value={filters.category}
                        onChange={handleFilterChange}
                        name="category"
                        className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
                    >
                        <option value="All">All Categories</option>
                        <option value="Uncategorized">Uncategorized</option>
                        {categoriesData?.map((category) => {
                            return (
                                <option key={category?.id} value={category?.name}>
                                    {category?.name}
                                </option>
                            );
                        })}
                    </select>
                    <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
            </div>
            <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
                <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        Filtered Transactions
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                        {transactions?.map((transaction) => (
                            <li
                                key={transaction.id}
                                className="bg-white p-3 rounded-md shadow border border-gray-200 flex justify-between items-center"
                            >
                                <div>
                  <span className="font-medium text-gray-600">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                                    <span
                                        className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            transaction.type === "income"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                    {transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1)}
                  </span>
                                    <span className="ml-2 text-gray-800">
                    {transaction.category?.name} - $
                                        {transaction.amount.toLocaleString()}
                  </span>
                                    <span className="text-sm text-gray-600 italic ml-2">
                    {transaction.description}
                  </span>
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => handleUpdateTransaction(transaction.id)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(transaction.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TransactionList;
//transaction list