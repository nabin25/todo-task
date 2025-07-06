import type { IUser } from "@/types/user";

const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const url = `${import.meta.env.VITE_MOCK_ENDPOINT}/users?email=${email}&password=${password}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  const result: IUser[] = await response.json();
  return result;
};

export default loginUser;
