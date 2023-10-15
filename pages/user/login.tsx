import styles from "@/styles/register.module.css"
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { checkToken } from "@/services/tokenConfig";

export default function loginPage() {
    const router = useRouter(); 
    
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    })

    function handleFormEdit(event: any, field: any) {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    }

    async function formSubmit(event: any) {
        try {
            event.preventDefault();

            const response = await fetch(`/api/actions/user/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const responseJson = await response.json();

            console.log(responseJson);
            console.log(response.status);

            if (response.status != 200) {
                throw new Error(responseJson.message);
            }

            setCookie('authorization', responseJson.token);

            router.push(`/`);

        } catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-">
            <Head>
                <title>Login</title>
            </Head>

            <div className="login-div">
                <p className={styles.p1}>Login</p>
                <form onSubmit={formSubmit}>
                    <label className="block">
                        <span className="block text-sm font-medium text-slate-700">UserName or Email</span>
                        <input className={styles.input} type="text" placeholder="login" value={formData.login} onChange={(event) => {handleFormEdit(event, "login")}}/>
                        <p></p>
                        <span className="block text-sm font-medium text-slate-700">Password</span>
                        <input className={styles.input} type="password" placeholder="senha" value={formData.password} onChange={(event) => {handleFormEdit(event, "password")}}/>
                        <p></p>
                        <Link className={styles.sendButton} href={`/user/register`}>Não tenho uma conta</Link>
                        <br />

                        <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">logar</button>

                    </label>
                </form>
            </div>

        </main>
    );
}

export function getServerSideProps({ req, res }: any) {
    try {
        const token = getCookie('authorization', { req, res });

        if (!token) {
            throw new Error('Invalid token');
        }

        checkToken(token);

        return {
            redirect: {
                permanent: false,
                destination: `/`,
            },
            props: {}
        };
    }
    catch (err) {
        return {
            props: {}
        }
    }
}