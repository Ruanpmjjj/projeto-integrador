import styles from '@/styles/movie.module.css';
import { useState, useEffect } from 'react';

export default function moviePage({movieId}: any) {
    const [data, setData]: any = useState(undefined);

    async function fetchData() {
        const response = await fetch(`/api/actions/movie/find?publicId=` + movieId, {
            method: 'GET'
        });

        const responseJson = await response.json();
        console.log(responseJson);
        
        setData(responseJson);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <main className={`flex min-h-screen flex-col ${styles.pageBackground}`}>
            <div className={styles.menuTopo}>
                <div className={styles.menuSuperior}>
                    <div className={styles.menuSuperiorEsquerda}>
                        <a className={styles.cursor} href={'/'}>Back to Home Page</a>
                    </div>
                    <div className={styles.menuSuperiorDireita}>
                        <a className={styles.cursor}>Log Out</a>
                    </div>
                </div>
            </div>
            <div className={styles.moviePage}>
            {data != undefined ?
                    <div className={styles.container}>
                        <div className={styles.flexInfoMovie}>
                            <img className={styles.movieImg} src="/images/movie.png" alt={data.title} />
                            <div className={styles.movieInfo}>
                                <h1 className={styles.h1}>{data.title}</h1>
                                <div className={styles.h2}>
                                    <h2>Release Date: {data.releaseYear}</h2>
                                    <h2>Duration: {data.duration}</h2>
                                </div>
                                <h3 className={styles.h3}>Synopsis</h3>
                                <p className={styles.p}>{data.synopsis}</p>
                                <h3 className={styles.h3}>Rating</h3>
                            </div>
                        </div>
                    </div>
                : <p>Movie not found</p>}
            </div>
        </main>
    )
}

export function getServerSideProps(context: any) {
    const {movieId} = context.query;
    
    return {
        props: { movieId }
    }
}