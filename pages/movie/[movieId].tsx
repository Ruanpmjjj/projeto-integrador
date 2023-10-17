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
                    userName: tokenInfos.login,
                    moviePublicId: movieId
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
                        <img className={styles.movieImg} src={data.imageURL} alt={data.title} />
                        <div className={styles.movieInfo}>
                            <h1 className={styles.h1}>{data.title}</h1>
                            <div className={styles.h2}>
                                <h2>Release Date: {data.releaseYear}</h2>
                                <h2>Duration: {data.duration}</h2>
                            </div>
                            <h3 className={styles.h3}>Genres</h3>
                            {data.genres.map(genre => (
                                <p>teste{genre.name}</p>
                            ))}
                            <h3 className={styles.h3}>Synopsis</h3>
                            <p className={styles.p}>{data.synopsis}</p>
                            <h3 className={styles.h3}>Reviews</h3>
                            <div className={styles.rating}>
                                <h4 className={styles.h4}>Make your Review</h4>
                                <form onSubmit={formSubmit}>
                                    <div className={styles.reviewInputs}>
                                        <div className={styles.inputGrades}>
                                            <label className={styles.labelInputs} htmlFor="grade">Select your Grade</label>
                                            <input className={styles.radioButtons} type="radio" name='grade' value={1} onChange={(event) => {handleFormEdit(event, "grade")}} required/>1
                                            <input className={styles.radioButtons} type="radio" name='grade' value={2} onChange={(event) => {handleFormEdit(event, "grade")}} required/>2
                                            <input className={styles.radioButtons} type="radio" name='grade' value={3} onChange={(event) => {handleFormEdit(event, "grade")}} required/>3
                                            <input className={styles.radioButtons} type="radio" name='grade' value={4} onChange={(event) => {handleFormEdit(event, "grade")}} required/>4
                                            <input className={styles.radioButtons} type="radio" name='grade' value={5} onChange={(event) => {handleFormEdit(event, "grade")}} required/>5
                                        </div>
                                        <div className={styles.descriptionDiv}>
                                            <label className={styles.labelInputs} htmlFor="description">Describe your Rating</label>
                                            <textarea className={styles.textareaDescription} value={formRating.description} onChange={(event) => {handleFormEdit(event, "description")}} placeholder='Mussum Ipsum, cacilds vidis litro abertis. Quem num gosta di mé, boa gentis num é.'></textarea>
                                        </div>
                                    </div>
                                    <button className={styles.sendButton}>Send</button>
                                </form>
                            </div>
                            <div>
                                <h4 className={styles.h4}>Public reviews</h4>
                                {data.ratings.map(rating => (
                                    <div className={styles.userReviews}>
                                        <p>UserName: {rating.user.nickName}</p>
                                        <p>Nota: {rating.grade}</p>
                                        <p>Comentário: {rating.description}</p>
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