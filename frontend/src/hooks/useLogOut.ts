import { useAuthContext } from "./useAuthContext";

export function useLogOut() {
  const { dispatch } = useAuthContext();

  function logOut() {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT", payload: null });
  }

  return { logOut };
}
