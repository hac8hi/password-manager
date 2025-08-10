import { createContext, useReducer, type Dispatch, type ReactNode } from "react";

interface LoginsContextType {
    logins: any[] | null;
    dispatch: Dispatch<{ type: string; payload: any }>;
}

export const LoginsContext = createContext<LoginsContextType | undefined>(undefined);

export function loginsReducer(state: { logins: any; }, action: { type: any; payload: any; }) {
    switch (action.type) {
        case 'SET_LOGINS':
            return {
                logins: action.payload
            }
        case 'CREATE_LOGIN':
            return {
                logins: [action.payload, ...state.logins]
            }
        case 'DELETE_LOGIN':
            return {
                logins: state.logins.filter((l: { _id: string; }) => { l._id !== action.payload._id })
            }
        default:
            return state
    }
}

export function LoginsContextProvider({ children }: { children: ReactNode }) {

    const [state, dispatch] = useReducer(loginsReducer, {
        logins: null
    })

    return (
        <LoginsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </LoginsContext.Provider>
    )
}
