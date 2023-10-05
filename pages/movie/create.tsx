import { useState } from 'react'
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/createMovie.module.css"
import { getCookie } from 'cookies-next';
import { checkToken } from '@/services/tokenConfig';

export default function createMovie() {
    const [formData , setFormData] = useState({
        title: '',
        synopsis: '',
        releaseYear: '',
        duration: ''
    });

    function handleFormEdit(event: any , name: string) {
        setFormData({
            ...formData,
            [name] : event.target.value
        });
    }

    async function formSubmit(event: any) {
        event.preventDefault();

        try {
            const response = await fetch(`/api/actions/movie/create`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const responseJson = await response.json();

            if (response.status != 200) {
                throw new Error(responseJson.message);
            }

            alert("Movie created.");
        }
        catch (err:any) {
            alert(err.message);
        }
    }

    return (
        <main className="flex min-h-screen flex-col   m-24">
            <Head>
                <title>Create Movie</title>
            </Head>
            <Link className={styles.sendButton} href={`/`}>Back</Link>
            <form onSubmit={formSubmit}>
                <div className={styles.createMovie}>
                    <input className={styles.input} type="text" value={formData.title} onChange={(event) => handleFormEdit(event , "title")} placeholder="Title"/>
                    <textarea className={styles.textarea} value={formData.synopsis} onChange={(event) => handleFormEdit(event, "synopsis")} placeholder="Synopsis"></textarea>
                    <input className={styles.input} type="date" value={formData.releaseYear} onChange={(event) => handleFormEdit(event, "releaseYear")} maxLength={4} placeholder="Release Year"/>
                    <input className={styles.input} type="time" value={formData.duration} onChange={(event) => handleFormEdit(event, "duration")}/>
                    <button className={styles.createMovieButton}>Send</button>
                </div>
            </form>
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
  
      return { props: {} };
    }
    catch (err) {
      return {
        /*redirect: {
          permanent: false,
          destination: `/user/login`,
        },*/
        props: {}
      }
    }
  }