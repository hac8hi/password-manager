import { createContext, useEffect, useReducer, type Dispatch, type ReactNode } from "react";

interface User {
    userName: string,
    token: string
}

interface AuthContextType {
    user: User | null;
    dispatch: Dispatch<{ type: string; payload: any }>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthReducer(state: { user: any }, action: { type: string; payload: any }) {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload
            }
        case 'LOGOUT':
            return {
                user: null
            }
        default:
            return state
    }
}

export function AuthContextProvider({ children }: { children: ReactNode }) {

    const [state, dispatch] = useReducer(AuthReducer, {
        user: null
    })

    useEffect(() => {
        const userLogIn = localStorage.getItem('user')
        if (userLogIn) {
            const user = JSON.parse(userLogIn)
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}