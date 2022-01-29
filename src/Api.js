const API_KEY = "639ab325878d6bb7c24265f10a6b44fd";
const BASE_URL = "https://api.themoviedb.org/3/";

async function fetchMovies(url = "") {
  const response = await fetch(url);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error("Not found"));
}

export function fetchTrendingMovies() {
  return fetchMovies(`${BASE_URL}trending/all/day?api_key=${API_KEY}`);
}

export function fetchMoviesByQuery(query) {
  return fetchMovies(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
  );
}

export function fetchMovieById(movie_id) {
  return fetchMovies(
    `${BASE_URL}movie/${movie_id}?api_key=${API_KEY}&language=en-US`
  );
}

export function fetchCastById(movie_id) {
  return fetchMovies(
    `${BASE_URL}movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`
  );
}

export function fetchReviewsByMovieId(movie_id) {
  return fetchMovies(
    `${BASE_URL}movie/${movie_id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
}
