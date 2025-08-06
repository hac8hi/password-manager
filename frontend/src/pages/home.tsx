import Logins from "../component/logins";
import LoginForm from "../component/loginForm";

export default function Home() {


    return (
        <main className="flex md:flex-row flex-col items-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <LoginForm />
            <Logins />
        </main>
    )
}