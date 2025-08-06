export default function Register() {
    return (
        <main className="flex flex-col items-center justify-center">
            <div className="flex flex-col bg-white rounded-md shadow-md md:p-8 p-4">
                <h2 className="text-xl sm:text-2xl font-bold mb-10">Sign Up</h2>
                <form className="flex flex-col gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            className="w-full px-3 py-2 bg-[#f9f8f7] border border-black/[.15] rounded-md focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 bg-[#f9f8f7] border border-black/[.15] rounded-md focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 bg-[#f9f8f7] border border-black/[.15] rounded-md focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-4 bg-blue-500 font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </main>
    )
}