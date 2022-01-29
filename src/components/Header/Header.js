import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
export default function Header() {
  return (
    <header className={s.header}>
      <NavLink
        to="/"
        className={(navData) => (navData.isActive ? s.activeLink : s.link)}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={(navData) => (navData.isActive ? s.activeLink : s.link)}
      >
        Movies
      </NavLink>
    </header>
  );
}
