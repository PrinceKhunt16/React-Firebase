import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

const CRUD = () => {
    const [movieList, setMovieList] = useState([]);
    const [newMovieTitle, setNewMovieTitle] = useState("");
    const [newReleaseDate, setNewReleaseDate] = useState(null);
    const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const movieCollectionRef = collection(db, "movies")

    const onSubmitMovie = async () => {
        try {
            await addDoc(movieCollectionRef, {
                title: newMovieTitle,
                releaseDate: newReleaseDate,
                receivedAnOscar: isNewMovieOscar,
                userId: auth?.currentUser?.uid
            });

            getMovieList()
            setNewMovieTitle("")
            setNewReleaseDate(null)
            setIsNewMovieOscar(false)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteMovie = async (id) => {
        const movieDoc = doc(db, "movies", id);
        await deleteDoc(movieDoc);
        getMovieList()
    }

    const updateMovieTitle = async (id) => {
        const movieDoc = doc(db, "movies", id);
        await updateDoc(movieDoc, { title: updatedTitle });
        setUpdatedTitle("")
        getMovieList()
    };

    const getMovieList = async () => {
        try {
            const data = await getDocs(movieCollectionRef)
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setMovieList(filteredData)
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        getMovieList()
    }, [])

    return <div>
        <div>
            <input
                value={newMovieTitle}
                placeholder="Movie title..."
                onChange={(e) => setNewMovieTitle(e.target.value)}
            />
            <input
                value={newReleaseDate}
                placeholder="Release Date..."
                type="number"
                onChange={(e) => setNewReleaseDate(Number(e.target.value))}
            />
            <input
                value={isNewMovieOscar}
                type="checkbox"
                checked={isNewMovieOscar}
                onChange={(e) => setIsNewMovieOscar(e.target.checked)}
            />
            <label> Received an Oscar</label>
            <button onClick={onSubmitMovie}> Submit Movie</button>
        </div>
        {movieList.map((movie, id) => (
            <div key={id}>
                <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
                    {movie.title}
                </h1>
                <p> Date: {movie.releaseDate} </p>
                <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>
                <input
                    placeholder="new title..."
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
            </div>
        ))}
    </div>;
};

export default CRUD;
