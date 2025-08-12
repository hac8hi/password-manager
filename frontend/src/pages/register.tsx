import { useState } from "react"
import { useSignUp } from "../hooks/useSignUp"

export default function Register() {

    const [userName, setUserName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const { signUp, isLoading, error } = useSignUp()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        await signUp(userName, email, password, confirmPassword)

        setUserName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <main className="flex h-screen items-center justify-center">
            <div className="md:w-lg flex flex-col bg-white rounded-md shadow-md md:p-8 p-4">
                <h2 className="text-xl sm:text-2xl font-bold mb-10">Sign Up</h2>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            onChange={(e) => {
                                setUserName(e.target.value)
                            }}
                            value={userName}
                            className="w-full px-3 py-2 bg-[#f9f8f7] border border-black/[.15] rounded-md focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="text"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            value={email}
                            className="w-full px-3 py-2 bg-[#f9f8f7] border border-black/[.15] rounded-md focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            value={password}
                            className="w-full px-3 py-2 bg-[#f9f8f7] border border-black/[.15] rounded-md focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Confirm Password</label>
                        <input
                            type="password"
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                            }}
                            value={confirmPassword}
                            className="w-full px-3 py-2 bg-[#f9f8f7] border border-black/[.15] rounded-md focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-4 py-2 mt-4 bg-blue-500 font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white cursor-pointer transition duration-200"
                    >
                        Sign Up
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
        </main>
    )
}