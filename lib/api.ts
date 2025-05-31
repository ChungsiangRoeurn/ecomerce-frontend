interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export async function signupUser(data: SignupData) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to sign up");
  }

  return await response.json();
}
