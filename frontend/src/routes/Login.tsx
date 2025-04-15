import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DVDScreensaver from "../components/DVDScreensaver"

export function Login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loginError, setLoginError] = useState<"EMPTY_FIELD" | "WRONG_PASS" | undefined>()
    const navigation = useNavigate()

    const handleLogin = () => {
        navigation("/feed")
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center w-screen h-screen">
                <div className="flex flex-col justify-center items-center space-y-2 w-[40%] h-[60%] bg-gradient-to-tr from-indigo-200 to-red-200 rounded-3xl">
                    <div className="flex text-lg border-2 space-x-2 p-2 rounded-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <input type="text" className="outline-0" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex text-lg border-2 space-x-2 p-2 rounded-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        <input type="password" className="outline-0" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="cursor-pointer text-blue-300">Don't have an account?</div>
                    <button className="cursor-pointer rounded-xl p-2 font-semibold bg-blue-500 text-white" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>

    )
}