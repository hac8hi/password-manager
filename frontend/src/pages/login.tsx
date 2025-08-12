import { useState } from "react"
import { useSignIn } from "../hooks/useSingIn"

export default function Login() {

    const [userNameOrEmail, setUserNameOrEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const { signIn } = useSignIn()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        await signIn(userNameOrEmail, password)

        setUserNameOrEmail("")
        setPassword("")
    }


    return (
        <main className="flex h-screen items-center justify-center">
            <div className="md:w-lg flex flex-col bg-white rounded-md shadow-md md:p-8 p-4">
                <h2 className="text-xl sm:text-2xl font-bold mb-10">Sign In</h2>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium mb-1">Username or Email</label>
                        <input
                            type="text"
                            onChange={(e) => setUserNameOrEmail(e.target.value)}
                            value={userNameOrEmail}
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
                        Sign In
                    </button>
                </form>
            </div>
        </main>
    )
}