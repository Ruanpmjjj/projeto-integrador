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
        <main className='flex min-h-screen flex-col'>
            <a href="/">Back to Home Page</a>
            {data != undefined ?
                <div className={styles.container}>
                    <div className={styles.flexInfoMovie}>
                        <img className={styles.movieImg} src="/images/movie.png" alt={data.title} />
                        <div className={styles.movieInfo}>
                            <h1>{data.title}</h1>
                            <h2>{data.releaseYear}</h2>
                            <p>{data.synopsis}</p>
                        </div>
                    </div>
                </div>
            : <p>Movie not found</p>}
        </main>
    )
}

export function getServerSideProps(context: any) {
    const {movieId} = context.query;
    
    return {
        props: { movieId }
    }
}