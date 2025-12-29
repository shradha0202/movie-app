import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../config";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`
        );
        const data = await res.json();
        console.log("DETAILS:", data);

        if (data.Response === "True") {
          setMovie(data);
        }
      } catch (error) {
        console.log("Error loading details", error);
      }

      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <h2 style={{ color: "#fff", textAlign: "center", marginTop: 40 }}>Loading...</h2>;
  }

  if (!movie) {
    return <h2 style={{ color: "red", textAlign: "center", marginTop: 40 }}>Movie Not Found</h2>;
  }

  return (
    <div
      style={{
        padding: "40px 16px",
        maxWidth: "900px",
        margin: "40px auto",
        background: "#181818",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.7)",
        color: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "32px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Poster */}
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/280x400"
          }
          alt={movie.Title}
          style={{
            width: "280px",
            borderRadius: "12px",
            boxShadow:
              "0 5px 20px rgba(229,9,20,0.2), 0 5px 20px rgba(0,0,0,0.6)",
            background: "#222",
          }}
        />

        {/* Text */}
        <div style={{ flex: 1, minWidth: 220 }}>
          <h1 style={{ marginBottom: "15px", color: "#e50914" }}>
            {movie.Title}
          </h1>

          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.Runtime}
          </p>
          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>

          <p>
            <strong>Rating:</strong>{" "}
            <span style={{ color: "#ffd700" }}>⭐ {movie.imdbRating}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
