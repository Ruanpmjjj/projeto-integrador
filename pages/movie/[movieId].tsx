import { checkToken } from '@/services/tokenConfig';
import styles from '@/styles/movie.module.css';
import { getCookie } from 'cookies-next';
import { useState, useEffect } from 'react';

export default function moviePage({movieId}: any) {
    const [data, setData]: any = useState(undefined);
    const [formRating, setFormRating] = useState({
        grade: 0,
        description: ""
    })

    function handleFormEdit(event: any, name: string) {
        setFormRating({
            ...formRating,
            [name]: event.target.value
        })
    }

    async function formSubmit(event: any) {
        try {
            event.preventDefault();

            const cookieAuth = getCookie('authorization');
            const tokenInfos = checkToken(cookieAuth);

            const response = await fetch(`/api/actions/rating/create`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    grade: Number(formRating.grade),
                    description: formRating.description,
                    userName: tokenInfos.userName,
                    movieId: movieId
                })
            })

            const responseJson = await response.json();

            if (response.status != 200) {
                throw new Error(responseJson.message)
            }

            alert("Rating created");

        } catch (err: any) {
            alert(err.message);
        }
    }

    async function fetchData() {
        const response = await fetch(`/api/actions/movie/find?publicId=` + movieId, {
            method: 'GET'
        });

        const responseJson = await response.json();
        
        setData(responseJson);
    }

    useEffect(() => {
        fetchData();
    }, []);

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
                            <div className={styles.rating}>
                                <h3>Your Review</h3>
                                <form onSubmit={formSubmit}>
                                    <input type="number" value={formRating.grade} onChange={(event) => {handleFormEdit(event, "grade")}} />
                                    <textarea className='' value={formRating.description} onChange={(event) => {handleFormEdit(event, "description")}} placeholder='Leave your review'></textarea>
                                </form>
                            </div>
                            <div>
                                <h3>Reviews</h3>
                                {data.ratings.map(rating => (
                                    <div className={styles.singleComment}>
                                        <label>UserName: {rating.user.userName}</label>
                                        <br />
                                        <label>Nota: {rating.value}</label>
                                        <br />
                                        <label>Comentário: {rating.description}</label>
                                    </div>
                                ))}
                            </div>
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