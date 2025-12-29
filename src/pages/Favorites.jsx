import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter(movie => movie.imdbID !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    alert("Removed from Favorites 💔");
  };

  return (
    <div style={{ padding: "30px 20px", width: "95%", maxWidth: "1400px", margin: "20px auto" }}>
      <h1>My Favorite Movies ❤️</h1>

      {favorites.length === 0 && (
        <h3 style={{ textAlign: "center", marginTop: 40 }}>
          No favorite movies yet 😢  
          <br />
          Go add some from Home page!
        </h3>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "25px",
          marginTop: "20px",
        }}
      >
        {favorites.map((movie) => (
          <div
            key={movie.imdbID}
            style={{
              background: document.body.classList.contains("dark") ? "#1f1f1f" : "#f5f5f5",
              color: document.body.classList.contains("dark") ? "white" : "black",
              padding: "12px",
              borderRadius: "10px",
              transition: "0.2s",
              boxShadow: "0 0 5px rgba(0,0,0,0.4)",
              cursor: "pointer",
            }}
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300"}
              alt={movie.Title}
              style={{
                width: "100%",
                height: "320px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />

            <h3 style={{ margin: "10px 0 5px" }}>{movie.Title}</h3>
            <p style={{ opacity: 0.7 }}>{movie.Year}</p>

            <Link to={`/movie/${movie.imdbID}`}>
              <button style={{ marginTop: "8px" }}>View Details</button>
            </Link>

            <button
              onClick={() => removeFavorite(movie.imdbID)}
              style={{ marginTop: "8px" }}
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
