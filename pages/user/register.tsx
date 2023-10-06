import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/login.module.css";

export default function cadastroPage() {
    const router = useRouter();

    const [formData, setFormData] = useState(
        {
            nickName: '',
            email: '',
            password: '',
        }
    )

    const [error, setError] = useState('');

    function handleFormEdit(event: any, name: any) {
        setFormData({
            ...formData,
            [name]: event.target.value
        })
    }


    async function formSubmit(event: any) {

        try {
            event.preventDefault();

            const response = await fetch(`/api/actions/user/create`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const responseJson = await response.json();
            console.log(responseJson);
            console.log(response.status);

            if (response.status != 200) {
                throw new Error(responseJson.message);
            }

            alert("account created");

            router.push(`/user/login`);
        }
        catch (err: any) {
            console.log(err);
            setError(err.message)
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Head>
                <title>Cadastro</title>
            </Head>

            <form className="form-reg" onSubmit={formSubmit}>

                <p className="p-1">registre-se</p>
                <div>
                    <span className="block text-sm font-medium text-slate-700">UserName</span>
                    <input className="input-res" type="text" placeholder="Name" value={formData.nickName} onChange={(evento) => { handleFormEdit(evento, 'nickName') }} required />
                    <br></br>
                    <span className="block text-sm font-medium text-slate-700">Email</span>
                    <input className="input-res" type="email" placeholder="@gmail.com" value={formData.email} onChange={(evento) => { handleFormEdit(evento, 'email') }} required />
                    <br></br>
                    <span className="block text-sm font-medium text-slate-700">Password</span>
                    <input className="input-res" type="password" placeholder="Senha" value={formData.password} onChange={(evento) => { handleFormEdit(evento, 'password') }} required />
                    <br />
                    <button className="button-log">ja tenho uma conta</button>
                    <br></br>
                    <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        Logar
                    </button>
                </div>
            </form>
        </main>
    )
}