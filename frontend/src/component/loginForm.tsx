import { useState } from "react"

export default function LoginForm() {
    const [webSite, setWebSite] = useState<any>(null)
    const [identifier, setIdentifier] = useState<any>(null)
    const [password, setPassword] = useState<any>(null)
    const [error, setError] = useState<any>(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const login = { webSite, identifier, password }

        const response = await fetch('/api/manager', {
            method: 'POST',
            body: JSON.stringify(login),
            headers: {
                'content-type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setWebSite(null)
            setIdentifier(null)
            setPassword(null)
            setError(null)
            console.log(json)
        }
    }
    return (
        <>
            <div className="md:fixed md:w-md flex flex-col top-32 right-12 items-center justify-center md:p-8 p-4">
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
                            type="text"
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
                </form>
            </div>
        </>
    )
}