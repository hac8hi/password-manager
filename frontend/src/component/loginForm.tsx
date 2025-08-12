import { useState } from "react"
import { useLoginsContext } from "../hooks/useLoginsContext"
import { useAuthContext } from "../hooks/useAuthContext"

export default function LoginForm() {
    const { dispatch } = useLoginsContext()
    const { user } = useAuthContext()

    const [webSite, setWebSite] = useState<string>("")
    const [identifier, setIdentifier] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<any>(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!user) {
            setError("You must be logged in.")
            return
        }

        const login = { webSite, identifier, password }

        const response = await fetch('/api/manager', {
            method: 'POST',
            body: JSON.stringify(login),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user?.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            dispatch({ type: 'CREATE_LOGIN', payload: json })
            setWebSite("")
            setIdentifier("")
            setPassword("")
            setError("")
        }
    }
    return (
        <>
            <div className="md:w-lg flex flex-col md:p-8 p-4 md:mr-24">
                <h2 className="text-xl sm:text-2xl font-bold mb-10">Add new Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-1">Web Site</label>
                        <input
                            type="text"
                            onChange={(e) => setWebSite(e.target.value)}
                            value={webSite}
                            className="w-full px-3 py-2 bg-[#f9f8f7] border border-black/[.15] rounded-md focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Identifier</label>
                        <input
                            type="text"
                            onChange={(e) => setIdentifier(e.target.value)}
                            value={identifier}
                            className="w-full px-3 py-2 bg-[#f9f8f7] border border-black/[.15] rounded-md focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="w-full px-3 py-2 bg-[#f9f8f7] border border-black/[.15] rounded-md focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-4 bg-blue-500 font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white cursor-pointer transition duration-200"
                    >
                        Add Login
                    </button>
                    {
                        error && (
                            <div className="border border-red-800 bg-red-500 text-black mt-4 p-2">
                                {error}
                            </div>
                        )
                    }
                </form>
            </div>
        </>
    )
}