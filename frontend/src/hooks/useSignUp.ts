import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export function useSignUp() {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(null);
  const { dispatch } = useAuthContext();

  async function signUp(
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/register", {
      method: "POST",
      body: JSON.stringify({ userName, email, password, confirmPassword }),
      headers: {
        "content-type": "application/json",
      },
    });

    const json = await response.json();

    console.log(json);

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  }

  return { signUp, isLoading, error };
}
