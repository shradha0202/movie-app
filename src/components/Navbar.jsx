import { Link } from "react-router-dom";
import { useEffect } from "react";

function Navbar() {

  const toggleTheme = () => {
    document.body.classList.toggle("dark");

    const theme = document.body.classList.contains("dark")
      ? "dark"
      : "light";

    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <h2 style={styles.logo}>🎬 Movie App</h2>

        <div style={styles.links}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/favorites" style={styles.link}>My Favorites</Link>

          <button onClick={toggleTheme} style={styles.btn}>
            Dark Mode
          </button>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    width: "100%",
    background: "#0d0d0d",
    boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },

  container: {
    maxWidth: "1400px",
    width: "95%",
    margin: "auto",
    padding: "12px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    margin: 0,
    color: "white",
  },

  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    transition: "0.2s",
  },

  btn: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid gray",
    background: "#1f1f1f",
    cursor: "pointer",
    color: "white",
  }
};

export default Navbar;