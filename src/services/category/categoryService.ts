import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

// Define the shape of the category
interface Category {
    name: string;
    type: string;
}

interface CategoryResponse {
    data: any; // Adjust to fit the actual response shape if needed
}

// Get the token
const token = getUserFromStorage();

// Add Category
export const addCategoryAPI = async ({ name, type }: Category): Promise<CategoryResponse> => {
    const response: AxiosResponse<CategoryResponse> = await axios.post(
        `${BASE_URL}/categories/create`,
        { name, type },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

// Update Category
export const updateCategoryAPI = async ({ name, type, id }: Category & { id: string }): Promise<CategoryResponse> => {
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
export const deleteCategoryAPI = async (id: string): Promise<CategoryResponse> => {
    const response: AxiosResponse<CategoryResponse> = await axios.delete(`${BASE_URL}/categories/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// List Categories
export const listCategoriesAPI = async (): Promise<CategoryResponse> => {
    const response: AxiosResponse<CategoryResponse> = await axios.get(`${BASE_URL}/categories/lists`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};