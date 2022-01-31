import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import * as moviesAPI from "../../Api";
import * as storage from "../../LocalStorage/localStorage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState(
    () => storage.get("searchQuery") ?? ""
  );
  const [movies, setMovies] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    storage.save("searchQuery", searchQuery);
    setSearchQuery(searchQuery);
    if (searchQuery.trim() === "") {
      toast("Please enter search query");
      return;
    }
    onSubmit(searchQuery);
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    moviesAPI.fetchMoviesByQuery(searchQuery).then(setMovies);
  }, [searchQuery]);

  function onSubmit(searchQuery) {
    navigate({ ...location, search: `query=${searchQuery}` });
    try {
      moviesAPI.fetchMoviesByQuery(searchQuery).then(setMovies);
    } catch (error) {
      console.log(error);
    }
  }
  const handleQueryChange = (event) => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
    if (event.currentTarget.value === "") {
      navigate({ ...location, search: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies"
        autoComplete="off"
        autoFocus
        value={searchQuery}
        onChange={handleQueryChange}
      />
      <button>Search</button>
      <ToastContainer />
      {movies &&
        (movies.results.length === 0 ? (
          <p>Nothing has been found...</p>
        ) : (
          movies.results.map((res) => (
            <nav key={res.id}>
              <Link to={`/movies/${res.id}`}>{res.title}</Link>
            </nav>
          ))
        ))}
    </form>
  );
}
