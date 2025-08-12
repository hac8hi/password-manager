import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export function useSignIn() {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(null);
  const { dispatch } = useAuthContext();

  async function signIn(userNameOrEmail: string, password: string) {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ userNameOrEmail, password }),
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

  return { signIn, isLoading, error };
}
