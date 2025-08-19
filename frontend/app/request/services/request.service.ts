import api  from "@/lib/api";
import { CheckerData } from "../lib/request.schema";
import { CheckerWithName } from "../type/RequestType";

export const addRequest = async (data: CheckerData) => {
    const res = await api.post('/request/add-checker', data)
    return res.data
}



export const fetchChecker = async (): Promise<CheckerWithName[]> => {
    const response = await api.get<CheckerWithName[]>("/request/fetch-checker");
    return response.data;
}

export const deleteChecker= async (data: CheckerWithName) => {
    try {
        const response = await api.delete(`/request/checker/${data.id}`);
        return response.data; // Return only necessary data
    } catch (error) {
        console.error("Error deleting agent code:", error);
        throw error;
    }
};


export const updateChecker = async (data: CheckerData) => {
  try {
    if (!data.id) throw new Error("Missing ID for update");
    const response = await api.put(`/request/checker/${data.id}`, data); // ✅ id in URL
    return response.data;
  } catch (error) {
    console.error("Error updating checker", error);
    throw error;
  }
};


