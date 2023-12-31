import { checkToken } from '@/services/tokenConfig';
import { deleteCookie, getCookie } from 'cookies-next'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from "@/styles/home.module.css";
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [data, setData]: any = useState(undefined);
  const [movie, setMovie] = useState({
    title: '',
    releaseYear: '',
    synopsis: '',
    duration: '',
    createdAt: '',
    updatedAt: ''
  })

  async function fetchData() {
    const response = await fetch(`/api/actions/movie/select`, {
      method: 'GET'
    });

    const responseJson = await response.json();
    setData(responseJson);
  }

  useEffect(() => {
    fetchData();
  }, [])

  function logOut() {
    deleteCookie('authorization');
    router.push(`/user/login`);
  }

  function handleFormEdit(event: any) {
    setName(event.target.value);
  }

  async function formSubmit(event: any) {
    try {
      event.preventDefault();

      const response = await fetch(`/api/actions/movie/find?name=` + name, {
        method: 'GET'
      })

      const responseJson = await response.json();

      console.log(response.status);
      console.log(responseJson);

      setMovie({
        ...movie,
        title: responseJson.title,
        releaseYear: responseJson.releaseYear,
        synopsis: responseJson.synopsis,
        duration: responseJson.duration,
        createdAt: responseJson.created_at,
        updatedAt: responseJson.updated_at
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  function prettifyDateTime(str: string) {
    const [date, time] = str.split("T");
    const [year, month, day] = date.split("-");
    
    return `${day}/${month}/${year}`
  }

  function movieClick(publicId: string) {
    router.push(`/movie/` + publicId);
  }

  return (
    <main className={`flex min-h-screen flex-col ${styles.pageBackground} ${inter.className}`}>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles.menuTopo}>
        <div className={styles.menuSuperior}>
          <div className={styles.menuSuperiorEsquerda}>
            <a className={styles.cursor} href={'/movie/create'}>Create Movie</a>
          </div>
          <div className={styles.menuSuperiorDireita}>
            <a className={styles.cursor} onClick={logOut}>Log Out</a>
          </div>
        </div>
      </div>
      <header className={styles.fundoPesquisa}>
        <div className={styles.searchBar}>
          <form onSubmit={formSubmit}>
            <div className={styles.gapInputButton}>
              <input className={styles.inputPesquisa} type="text" placeholder='Search Movie' value={name} onChange={(evento) => { handleFormEdit(evento) }} autoFocus/>
              <button className={styles.searchButton}>SEARCH</button>
            </div>
          </form>
        </div>
      </header>
      <h1 className={styles.h1}>Best Movies</h1>
      <div className={`flex flex-wrap ${styles.movies}`}>
        {data != undefined && data instanceof Array ? data.map(item => (
          <div onClick={() => {movieClick(item.publicId)}} className={`${styles.container} ${styles.cursor}`}>
            <img className={styles.movieImg} src="/images/movie.png" alt={item.title} />
            <div className={styles.movieInfo}>
              <h3 className={styles.h3}>{item.title}</h3>
              <p>Release: {item.releaseYear}</p>
              <p>Duration: {item.duration}</p>
            </div>
          </div>
        ))
          : <p>No movies found</p>
        }
      </div>
    </main>
  )
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