import { LoginsContext } from "../context/loginsContext";
import { useContext } from "react";

export function useLoginsContext() {
  const context = useContext(LoginsContext);

  if (!context) {
    throw Error("useLoginsContext must be used inside a LoginsContextProvider");
  }

  return context;
}
