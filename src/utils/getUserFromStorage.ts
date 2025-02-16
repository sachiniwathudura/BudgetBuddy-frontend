export const getUserFromStorage = (): string | null => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) return null;

    try {
        const parsedUser = JSON.parse(userInfo) as { token?: string };
        return parsedUser?.token ?? null;
    } catch (error) {
        console.error("Error parsing userInfo from localStorage:", error);
        return null;
    }
};