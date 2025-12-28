import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../config";

function MovieDetails() {
  const { id } = useParams();          // get movie id from URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [id]);

  if (!movie) {
    return <h2 style={{color:"white"}}>Loading...</h2>;
  }

   return (
  <div style={{
    padding: "40px",
    maxWidth: "1000px",
    margin: "auto",
    color: "white"
  }}>

    <div style={{
      display: "flex",
      gap: "30px",
      alignItems: "flex-start",
      flexWrap: "wrap"
    }}>
      
      {/* POSTER */}
      <img 
        src={movie.Poster}
        alt={movie.Title}
        style={{
          width: "280px",
          borderRadius: "10px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.6)"
        }}
      />

      {/* TEXT */}
      <div style={{ flex: 1 }}>
        <h1 style={{ marginBottom: "15px" }}>{movie.Title}</h1>

        <p><strong>Plot:</strong> {movie.Plot}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Runtime:</strong> {movie.Runtime}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p><strong>Rating:</strong> ⭐ {movie.imdbRating}</p>
      </div>

    </div>
  </div>
);
}

export default MovieDetails;