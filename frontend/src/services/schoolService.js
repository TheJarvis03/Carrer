import axios, { getAdapter } from "axios";

const API_URL = "http://localhost:5000/api/seacrch/schools";

export const schoolService = {
    getAll: async () => {
        try {
            const res = await axios.get(API_URL);
            const { success, data } = res.data;

            if (success && Array.isArray(data)) {
                return {
                    success: true,
                    data: data.map((school) => ({
                        id: school.id || school.school_id,
                        name: school.name || school.school_name,
                        location: school.location || school.school_location,
                        type: school.type || school.school_type,
                        description: school.description || "",
                    })),
                };
            }

            return { success: false, error: "Invalid data format" };
        } catch (error) {
            console.error("Error fetching schools:", error);
            return { success: false, error: error.message };
        }
    },

}
