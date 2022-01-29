import { useState, useEffect } from "react";
import * as moviesAPI from "../../Api";
import PropTypes from "prop-types";
import s from "./Cast.module.css";

export default function Cast({ movieId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      const currentCast = await moviesAPI.fetchCastById(movieId);
      setCast(currentCast);
    };
    getCast();
  }, [movieId]);

  return (
    <div>
      <ul className={s.castlist}>
        {cast &&
          cast.cast.map(({ id, profile_path, original_name, character }) => (
            <li key={id}>
              <img
                src={
                  profile_path !== null
                    ? `https://image.tmdb.org/t/p/w300${profile_path}`
                    : "https://i.postimg.cc/FKqRRtbF/No-Image.png"
                }
                alt={original_name}
              />
              <div>
                <p>{original_name}</p>
                <p>Character: {character}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};
