import { useState, useRef, useEffect } from "react";
import Home from "./home";

export default function Layout() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: { target: any; }) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <main className="antialiased bg-gray-100 relative">
            <header className="sticky top-0 w-full h-[70px] flex bg-white shadow-md p-4 px-4 py-2 md:px-3 items-center justify-between z-50">
                <div className="flex items-center">
                    <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
                    <span className="text-xl font-semibold">Password Manager</span>
                </div>
                <nav className="flex space-x-4">
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className="text-gray-700 hover:text-blue-500 focus:outline-none cursor-pointer px-4 py-2 rounded-md transition-colors duration-200"
                            onClick={() => setDropdownOpen((open) => !open)}
                        >
                            User
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
                                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</a>
                                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</a>
                            </div>
                        )}
                    </div>
                </nav>
            </header>
            <Home />
        </main>
    );
}