import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

// Define the shape of the data for login, register, and profile updates
interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterCredentials {
    email: string;
    password: string;
    username: string;
}

interface ChangePasswordCredentials {
    newPassword: string;
}

interface UpdateProfileCredentials {
    email: string;
    username: string;
}

interface UserResponse {
    data: any; // Adjust based on the actual response structure
}

// Get the token
const token = getUserFromStorage();

// Login
export const loginAPI = async ({
                                   email,
                                   password,
                               }: LoginCredentials): Promise<UserResponse> => {
    const response: AxiosResponse<UserResponse> = await axios.post(
        `${BASE_URL}/users/login`,
        {
            email,
            password,
        }
    );
    return response.data;
};

// Register
export const registerAPI = async ({
                                      email,
                                      password,
                                      username,
                                  }: RegisterCredentials): Promise<UserResponse> => {
    const response: AxiosResponse<UserResponse> = await axios.post(
        `${BASE_URL}/users/register`,
        {
            email,
            password,
            username,
        }
    );
    return response.data;
};

// Change Password
export const changePasswordAPI = async ({
                                            newPassword,
                                        }: ChangePasswordCredentials): Promise<UserResponse> => {
    const response: AxiosResponse<UserResponse> = await axios.put(
        `${BASE_URL}/users/change-password`,
        {
            newPassword,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

// Update Profile
export const updateProfileAPI = async ({
                                           email,
                                           username,
                                       }: UpdateProfileCredentials): Promise<UserResponse> => {
    const response: AxiosResponse<UserResponse> = await axios.put(
        `${BASE_URL}/users/update-profile`,
        {
            email,
            username,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};