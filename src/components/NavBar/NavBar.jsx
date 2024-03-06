import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { useAuth } from "../../hooks/useAuth";
import css from "./NavBar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <nav className={css.nav}>
      <div className={css.navwraper}>
        <NavLink to="/">Home</NavLink>
        {isLoggedIn && <NavLink to="/contacts">Contacts</NavLink>}
      </div>
      {isLoggedIn ? (
        <div className={css.navwrap}>
          <p className={css.navName}>Welcome, {user.name}</p>
          <button
            className={css.navbtn}
            type="button"
            onClick={() => dispatch(logOut())}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className={css.navwrapLog}>
          <NavLink className={css.btn} to="/register">
            Register
          </NavLink>
          <NavLink className={css.btn} to="/login">
            Log In
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
