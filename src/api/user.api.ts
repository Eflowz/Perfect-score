import api from "./axios";

export const getCurrentUser = async () => {
 const response = await api.get("/users/me");

 return response.data.data;
};



export const updateUserProfile = async (
 data: { name: string }
) => {
 const response = await api.put("/users/me", data);
console.log("main respobse:", response)
 return response.data.data ?? response.data;
};