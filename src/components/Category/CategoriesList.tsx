import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
    deleteCategoryAPI,
    listCategoriesAPI,
} from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

interface Category {
    id: string;
    name: string;
    type: "income" | "expense";
}

const CategoriesList: React.FC = () => {
    // Fetching categories
    const { data, isError, isLoading, error, refetch } = useQuery<Category[]>({
        queryFn: listCategoriesAPI,
        queryKey: ["list-categories"],
    });

    // Deleting category
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: deleteCategoryAPI,
        mutationKey: ["delete-category"],
    });

    // Delete handler
    const handleDelete = async (id: string) => {
        try {
            await mutation.mutateAsync(Number(id));
            refetch();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Categories</h2>
            {/* Display message */}
            {isLoading && <AlertMessage type="loading" message="Loading" />}
            {isError && (
                <AlertMessage
                    type="error"
                    message={(error as any)?.response?.data?.message || "An error occurred"}
                />
            )}
            <ul className="space-y-4">
                {data?.map((category) => {
                    console.log("Category ID:", category.id); // Debugging log for category._id
                    return (
                        <li
                            key={category.id} // Ensure each category has a unique key
                            className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
                        >
                            <div>
                                <span className="text-gray-800">{category.name}</span>
                                <span
                                    className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        category.type === "income"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {category.type.charAt(0).toUpperCase() + category.type.slice(1)}
                                </span>
                            </div>
                            <div className="flex space-x-3">
                                <Link to={`/update-category/${category.id}`}>
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <FaEdit />
                                    </button>
                                </Link>
                                <button
                                    onClick={() => handleDelete(category.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CategoriesList;
//category list