import api from "./axios";

export async function signupUser(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  try {
    const response = await api.post("/register", data);

    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Signup failed. Please try again.";
    throw new Error(message);
  }
}
