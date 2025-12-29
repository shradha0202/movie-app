import { useState, useEffect } from "react";
import { API_KEY, BASE_URL } from "../config";
import { Link } from "react-router-dom";

function Home() {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // -------- Fetch Movies ----------
  const fetchMovies = async (term, newPage = 1) => {
    if (!term.trim()) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(term)}&page=${newPage}`
      );
      const data = await res.json();
      console.log("HOME DATA:", data);

      if (data.Response === "True") {
        const total = Math.ceil(data.totalResults / 10);
        setTotalPages(total);

        if (newPage === 1) setMovies(data.Search);
        else setMovies((prev) => [...prev, ...data.Search]);
      } else {
        setMovies([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.log("Fetch error", err);
    }

    setLoading(false);
  };

  // -------- Default Indian Suggestions ----------
  useEffect(() => {
    const indianTerms = ["bollywood", "tamil", "telugu", "kannada", "india"];
    const random = indianTerms[Math.floor(Math.random() * indianTerms.length)];

    setQuery(random);
    setPage(1);
    fetchMovies(random, 1);
  }, []);

  // -------- Search ----------
  const handleSearch = () => {
    if (!searchText.trim()) return;

    setQuery(searchText);
    setPage(1);
    fetchMovies(searchText, 1);
  };

  // -------- Load More ----------
  const handleLoadMore = () => {
    if (page >= totalPages) return;

    const next = page + 1;
    setPage(next);
    fetchMovies(query, next);
  };

  // -------- Favorites ----------
  const addToFavorites = (movie) => {
    let stored = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!stored.some((m) => m.imdbID === movie.imdbID)) {
      stored.push(movie);
      localStorage.setItem("favorites", JSON.stringify(stored));
      alert("Added to Favorites ❤️");
    } else {
      alert("Already in Favorites");
    }
  };

  const cardStyle = {
    background: document.body.classList.contains("dark")
      ? "#1f1f1f"
      : "#f5f5f5",
    color: document.body.classList.contains("dark") ? "white" : "black",
    padding: "12px",
    borderRadius: "10px",
    transition: "0.2s",
    boxShadow: "0 0 5px rgba(0,0,0,0.4)",
    cursor: "pointer",
  };

  return (
    <div style={{ padding: "30px 20px", width: "95%", maxWidth: "1400px", margin: "20px auto" }}>
      <h1>Movie Search</h1>

      {/* Search */}
      <div style={{ display: "flex", gap: "10px", width: "100%", maxWidth: 600, margin: "0 auto" }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            padding: "10px",
            flex: 1,
            borderRadius: "6px",
            border: "none",
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <p style={{ opacity: 0.7, marginTop: "8px" }}>
        Showing results for: <b>{query || "Suggestions"}</b>
      </p>

      {/* Loading */}
      {loading && <h3 style={{ textAlign: "center" }}>Loading...</h3>}

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "25px",
          marginTop: "20px",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            style={cardStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/200x300"
              }
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
              onClick={() => addToFavorites(movie)}
              style={{ marginTop: "8px" }}
            >
              ❤️ Add to Favorites
            </button>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {movies.length > 0 && page < totalPages && (
        <button
          onClick={handleLoadMore}
          style={{ marginTop: "25px", display: "block", marginInline: "auto" }}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default Home;
