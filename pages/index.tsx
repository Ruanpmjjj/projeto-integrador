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
  //const sequelize = new Sequelize('URI_DATABASE_CREDENTIALS',{native: true});
  const [name, setName] = useState("");
  const [movies, setMovies] = useState({ movies: []});
  const [movie, setMovie] = useState({
    title: '',
    releaseDate: '',
    createdAt: '',
    updatedAt: ''
  })

  async function fetchData() {
    const response = await fetch(`/api/actions/movie/select`, {
      method: 'GET'
    });

    const responseJson = await response.json();

    useEffect(() => {
      fetchData();
    }, [])}

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
        title: responseJson.name,
        releaseDate: responseJson.releaseDate,
        createdAt: responseJson.created_at,
        updatedAt: responseJson.updated_at
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <main className={`flex min-h-screen flex-col ${inter.className}`}>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles.menuTopo}>
        <div className={styles.menuSuperior}>
          <div className={styles.menuSuperiorEsquerda}>
          </div>
          <div className={styles.menuSuperiorDireita}>
            <a onClick={logOut}>Log Out</a>
          </div>
        </div>
      </div>
      <header className={styles.fundoPesquisa}>
        <div className={styles.searchBar}>
          <form onSubmit={formSubmit}>
            <div className={styles.gapInputButton}>
              <input className={styles.inputPesquisa} type="text" placeholder='Search bar' value={name} onChange={(evento) => { handleFormEdit(evento) }} />
              <button className={styles.searchButton}>SEARCH</button>
            </div>
          </form>
        </div>
      </header>
      <div>
        <div className={styles.container}>
          <div className={styles.blocoFilmes}>
            <section>
              <h3>{movie.title}</h3>
              <p>{movie.releaseDate}</p>
              <p>{movie.createdAt}</p>
              <p>{movie.updatedAt}</p>
            </section>
          </div>
        </div>
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