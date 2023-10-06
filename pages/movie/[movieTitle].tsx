import styles from '@/styles/movie.module.css';
import { useState, useEffect } from 'react';

export default function moviePage({movieTitle}: any) {
    const [data, setData]: any = useState(undefined);

    async function fetchData() {
        const response = await fetch(`/api/actions/movie/find?name=` + movieTitle, {
            method: 'GET'
        });

        const responseJson = await response.json();
        setData(responseJson);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <main className='flex min-h-screen flex-col'>
        {data != undefined ?
            <div className={styles.container}>
                <a href={`/`}>Back to HomePage</a>
                <div>
                    <h1>{data.name}</h1>
                    <p>{data.releaseDate}</p>
                </div>
            </div>
            : <p>Movie not found</p>}
    </main>
    )
}

export function getServerSideProps(context: any) {
    const {movieTitle} = context.query;
    
    return {
        props: { movieTitle }
    }
}