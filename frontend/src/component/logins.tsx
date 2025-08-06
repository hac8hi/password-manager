import { useEffect, useState } from "react"

export default function Logins() {

    const [logins, setLogins] = useState<any[]>([])
    const [id, setId] = useState<any>(null)
    const [login, setLogin] = useState<any>(null)

    useEffect(() => {
        async function fetchLogins() {
            const response = await fetch("/api/manager")
            const json = await response.json()
            if (response.ok) {
                setLogins(json)
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
        <>
            <div className="md:w-xl w-64 flex flex-col gap-4 md:ml-96 md:mt-0 mt-10">
                {logins && logins.map((login) => (
                    <button key={login._id} onClick={() => {
                        setId(login._id)
                    }} className="bg-white hover:bg-[#f9f8f7] shadow-md cursor-pointer rounded-md p-4">
                        <h3 className="text-lg font-semibold">{login.webSite}</h3>
                    </button>
                ))}
            </div>
            {login && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-md transition-opacity duration-300">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative md:m-0 m-4">
                        <button
                            onClick={() => setLogin(null)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">{login.webSite}</h2>
                        <p><strong>Identifier:</strong> {login.identifier}</p>
                        <p><strong>Password:</strong> {login.password}</p>
                    </div>
                </div>
            )}
        </>
    )
}