import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as moviesAPI from "../../Api";
import s from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  try {
    useEffect(() => {
      moviesAPI.fetchTrendingMovies().then(setMovies);
    }, []);
  } catch (error) {
    console.log(error);
  }

  return (
    <div className={s.container}>
      <h1>Trending today</h1>
      <ul>
        {movies &&
          movies.results.map((res) => (
            <li key={res.id}>
              <Link to={`/movies/${res.id}`}>{res.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
