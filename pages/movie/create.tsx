import { useState, useEffect } from 'react'
import Head from "next/head";
import styles from "@/styles/createMovie.module.css"
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { checkToken } from '@/services/tokenConfig';

export default function createMovie() {
    const router = useRouter();
    const[imageUploaded, setImageUploaded] = useState(undefined);
    const[data, setData]: any = useState(); 
    const [formData , setFormData] = useState({
        title: '',
        synopsis: '',
        releaseYear: '',
        duration: ''
    });

    var selectedGenres: Array<number> = [];

    function logOut() {
        deleteCookie('authorization');
        router.push(`/user/login`);
    }

    function handleCheckboxEdit(event:any , genreId:number) {
        console.log(event.target.checked);

        if (event.target.checked == true) {
            selectedGenres.push(Number(genreId));
        }
        else {
            const index = selectedGenres.indexOf(Number(genreId));

            if (index != undefined) {
                selectedGenres.splice(index , 1);
            }
        }
    }

    async function fetchData() {
        try {
            const response = await fetch(`/api/actions/genre/select`, {
                method: "GET"
            });

            const responseJson = await response.json();

            setData(responseJson);

        }
        catch (err: any) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchData();

    }, [])

    function handleImageUploadedEdit(event: any) {
        setImageUploaded(event.target.files[0]);
    }

    function handleFormEdit(event: any , name: string) {
        setFormData({
            ...formData,
            [name] : event.target.value
        });
    }

    async function formSubmit(event: any) {
        event.preventDefault();

        if (imageUploaded == undefined) {
            return;
        }

        try {
            const img = new FormData();
            img.append("image", imageUploaded)

            const response = await fetch(`/api/actions/movie/createImage`, {
                method: "POST",
                body: img
            });

            const responseJson = await response.json();

            if (response.status != 200) {
                throw new Error(responseJson.message);
            }

            createMovie(responseJson.secure_url)

        }
        catch (err:any) {
            alert(err.message);
        }
    }

    async function createMovie(imgURL: string) {
        try {
            const response = await fetch(`/api/actions/movie/create`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    title: formData.title,
                    releaseYear: formData.releaseYear,
                    genres: selectedGenres,
                    image: imgURL
                })
            });

            const responseJson = await response.json();

            if (response.status != 200) {
                throw new Error(responseJson.message);
            }

            alert("Movie created.");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

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
            <div className={styles.createMoviePage}>
                <Head>
                    <title>Create Movie</title>
                </Head>
                <h1 className={styles.h1}>Create Movie</h1>
                <form onSubmit={formSubmit}>
                    <div className={styles.movieForm}>
                        <label className={styles.label} htmlFor="title">Movie Title</label>
                        <input id='title' className={styles.input} type="text" value={formData.title} onChange={(event) => handleFormEdit(event , "title")} placeholder="E.g.: I am Legend" required autoFocus/>
                        <label className={styles.label} htmlFor="releaseYear">Release Date</label>
                        <input id='releaseYear' className={`${styles.input} ${styles.inputTimeDate}`} type="date" value={formData.releaseYear} onChange={(event) => handleFormEdit(event, "releaseYear")} required/>
                        <label className={styles.label} htmlFor="duration">Duration</label>
                        <input id='duration' className={`${styles.input} ${styles.inputTimeDate}`} type="time" value={formData.duration} onChange={(event) => handleFormEdit(event, "duration")} required/>
                        <label className={styles.label} htmlFor="synopsis">Synopsis</label>
                        <textarea id='synopsis' className={`${styles.input} ${styles.textarea}`} value={formData.synopsis} onChange={(event) => handleFormEdit(event, "synopsis")} placeholder="E.g.: Robert Neville is a brilliant scientist and the only survivor of an epidemic that turned humans into bloodthirsty mutants. Walking around New York City, he looks for other possible survivors and tries to find a cure for the plague using his own blood, which is immune." required></textarea>
                        <label className={styles.label} htmlFor="image">Image</label>
                        <input className={styles.inputImage} onChange={handleImageUploadedEdit} type='file' accept='.jpg, .jpeg, .png, .gif'/>
                        <label className={styles.label} htmlFor="genres">Genres</label>
                        <div className={styles.divGenres}>
                            <ul className="">
                                {data != undefined && data instanceof Array
                                    ?
                                    data.map(item => (
                                        <li>
                                            <div className={styles.divSelectGenres}>
                                                <input className={styles.checkboxGenre} type="checkbox" onChange={(event) => {handleCheckboxEdit(event, item.id)}} />
                                                <label className={styles.labelGenre}>{item.name}</label>
                                            </div>
                                        </li>
                                    ))
                                    :
                                    <div></div>
                                }
                            </ul>
                        </div>

                        <button className={styles.createMovieButton}>Create</button>

                    </div>
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
  
      return { props: {} };
    }
    catch (err) {
      return {
        redirect: {
          permanent: false,
          destination: `/user/login`,
        },
        props: {}
      }
    }
  }