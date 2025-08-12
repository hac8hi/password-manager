import { useAuthContext } from "./useAuthContext";
import { useLoginsContext } from "./useLoginsContext";

export function useLogOut() {
  const { dispatch } = useAuthContext();
  const { dispatch: loginsDispatch } = useLoginsContext();

  function logOut() {
    localStorage.removeItem("user");

    loginsDispatch({ type: "SET_LOGINS", payload: null });
    dispatch({ type: "LOGOUT", payload: null });
  }

  return { logOut };
}
