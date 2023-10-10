import styles from "@/styles/register.module.css"
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
                <p className={styles.p1}>Login</p>
                <form>
                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700">UserName or Email</span>
                        <input className={styles.input} type="text" placeholder="login" />
                        <p></p>
                        <span className="block text-sm font-medium text-slate-700">Password</span>
                        <input className={styles.input} type="password" placeholder="senha" />
                        <p></p>
                        <Link className={styles.sendButton} href={`/user/register`}>Não tenho uma conta</Link>
                        <br />

                        <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                            logar
                        </button>

                    </label>
                </form>
            </div>

        </main>
    )

}