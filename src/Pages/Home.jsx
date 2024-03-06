import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { NavLink } from "react-router-dom";

function Home() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <>
      <h1> Welcome to Phonebook App</h1>
      <button>
        {isLoggedIn ? (
          <NavLink to="/contacts">Get Started</NavLink>
        ) : (
          <NavLink to="/register">Get Started</NavLink>
        )}
      </button>
    </>
  );
}

export default Home;
