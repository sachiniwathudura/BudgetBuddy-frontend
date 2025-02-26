//-------transactionservice.ts------

import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage.ts";

interface Transaction {
    type: string;
    categoryId: number;
    date: string;
    description: string;
    amount: number;
}

interface TransactionQueryParams {
    categoryId: number;
    type: string;
    startDate: string;
    endDate: string;
}

interface Category {
    name: string;
    type: string;
}

interface CategoryResponse {
    data: any; // Adjust based on actual response structure
}

interface TransactionResponse {
    data: any; // Adjust based on actual response structure
}

// Get the token
const token = getUserFromStorage();

// Add Transaction
export const addTransactionAPI = async ({
                                            type,
                                            categoryId,
                                            date,
                                            description,
                                            amount,
                                        }: Transaction): Promise<TransactionResponse> => {
    const response: AxiosResponse<TransactionResponse> = await axios.post(
        `${BASE_URL}/transactions/create`,
        {
            categoryId,
            date,
            description,
            amount,
            type,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};
// Update Category
export const updateCategoryAPI = async ({
                                            name,
                                            type,
                                            id,
                                        }: Category & { id:number }): Promise<CategoryResponse> => {
    const response: AxiosResponse<CategoryResponse> = await axios.put(
        `${BASE_URL}/categories/update/${id}`,
        { name, type },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

// Delete Category
export const deleteCategoryAPI = async (id: number): Promise<CategoryResponse> => {
    const response: AxiosResponse<CategoryResponse> = await axios.delete(
        `${BASE_URL}/categories/delete/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

// List Transactions
export const listTransactionsAPI = async ({
                                              categoryId,
                                              type,
                                              startDate,
                                              endDate,
                                          }: TransactionQueryParams): Promise<TransactionResponse> => {
    const response: AxiosResponse<TransactionResponse> = await axios.get(
        `${BASE_URL}/transactions/lists`,
        {
            params: { categoryId, startDate, endDate, type },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

//
// **Update Transaction**
export const updateTransactionAPI = async (id: number, transactionData: Transaction): Promise<TransactionResponse> => {
    try {
        const response: AxiosResponse<TransactionResponse> = await axios.put(
            `${BASE_URL}/transactions/update/${id}`,
            transactionData,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
};

// **Delete Transaction**
export const deleteTransactionAPI = async (id: string): Promise<TransactionResponse> => {
    try {
        const response: AxiosResponse<TransactionResponse> = await axios.delete(
            `${BASE_URL}/transactions/delete/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
};

// Get Transaction by ID
export const getTransactionByIdAPI = async (id: number): Promise<TransactionResponse> => {
    try {
        const response: AxiosResponse<TransactionResponse> = await axios.get(
            `${BASE_URL}/transactions/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
};