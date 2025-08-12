import { useEffect, useState } from "react"
import { useLoginsContext } from "../hooks/useLoginsContext"
import LoginForm from "../component/loginForm"


export default function Home() {

    const [id, setId] = useState<any>(null)
    const [login, setLogin] = useState<any>(null)

    const { logins, dispatch } = useLoginsContext()


    async function handleClick() {

        if (!id) return

        const response = await fetch(`/api/manager/${id}`, {
            method: 'DELETE'
        }
        )
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_LOGIN', payload: json })
            setLogin(null)
            setId(null)
        }
    }

    useEffect(() => {

        async function fetchLogins() {

            const response = await fetch("/api/manager")
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_LOGINS', payload: json })
            }
        }
        fetchLogins()
        async function fetchLogin() {

            if (!id) return

            const response = await fetch(`/api/manager/${id}`)
            const json = await response.json()

            if (response.ok) {
                setLogin(json)
            }
        }
        fetchLogin()
    }, [id])

    return (
        <main className="flex md:flex-row flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <LoginForm />
            <div className="md:w-xl w-64 flex flex-col gap-4 md:mt-0 mt-10">
                {logins && logins.map((login) => (
                    <span key={login._id} onClick={() => {
                        setId(login._id)
                    }} className="bg-white hover:bg-[#f9f8f7] shadow-md cursor-pointer rounded-md p-4">
                        <h3 className="text-lg font-semibold">{login.webSite}</h3>
                    </span>
                ))}
            </div>
            {login && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-md transition-opacity duration-300">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative md:m-0 m-4">
                        <button
                            onClick={() => {
                                setLogin(null)
                                setId(null)
                            }}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">{login.webSite}</h2>
                        <p><strong>Identifier:</strong> {login.identifier}</p>
                        <p><strong>Password:</strong> {login.password}</p>
                        <button className="bg-red-600 hover:bg-red-800 text-black border border-red-800 cursor-pointer rounded-md mt-4 p-2" onClick={
                            handleClick
                        }>Delete</button>
                    </div>
                </div>
            )}
        </main>
    )
}