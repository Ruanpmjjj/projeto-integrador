
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { setCookie } from "cookies-next";

export default function loginPage() {
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    })

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-">
            <Head>
                <title>Login</title>
            </Head>

            <div className="login-div">
                <form>
                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700">Email ou NickName </span>
                        <input type="email" className="peer ..." />
                        <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                        </p>
                    </label>
                </form>
            </div>

        </main>
    )


}
