import {
  Route,
  Routes,
  useParams,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import * as moviesAPI from "../../Api";
const Cast = lazy(() => import("../Cast/Cast.js"));
const Reviews = lazy(() => import("../Reviews/Reviews.js"));

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getMovie = async () => {
      const currentMovie = await moviesAPI.fetchMovieById(movieId);
      setMovie(currentMovie);
    };
    getMovie();
  }, [movieId]);

  const onGoBack = () => {
    if (location.pathname === `/movies/${movieId}`) {
      navigate(-1);
    }
    if (location.pathname === `/movies/${movieId}/cast`) {
      navigate(-2);
    }
    if (location.pathname === `/movies/${movieId}/reviews`) {
      navigate(-2);
    }
  };
  return (
    <div>
      {movie && (
        <div>
          <div>
            <button onClick={onGoBack}>Go Back</button>
            <div>
              <img
                src={
                  movie.poster_path !== null
                    ? `https://image.tmdb.org/t/p/w400${movie.poster_path}`
                    : "https://i.postimg.cc/FKqRRtbF/No-Image.png"
                }
                alt={movie.title}
              />
            </div>
            <div>
              <h2>
                {movie.title} ({movie.release_date.slice(0, 4)})
              </h2>
              <p>User score: {movie.vote_average}</p>
              <h3>Overveiw</h3>
              <p>{movie.overview ? movie.overview : "No information"}</p>
              <h3>Genres</h3>
              <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
            </div>
          </div>
          <div>
            <h3>Additional Information</h3>
            <ul>
              <li>
                <NavLink to={{ pathname: "cast" }}>Cast</NavLink>
              </li>
              <li>
                <NavLink to={{ pathname: "reviews" }}>Reviews</NavLink>
              </li>
            </ul>
            <Suspense fallback={<h1>Loading...</h1>}>
              <Routes>
                <Route path="cast" element={<Cast movieId={movieId} />} />
                <Route path="reviews" element={<Reviews movieId={movieId} />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      )}
      <hr />
    </div>
  );
}
