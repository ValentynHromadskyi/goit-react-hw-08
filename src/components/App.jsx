import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { selectError, selectLoading } from "../redux/contacts/selectors";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { refreshUser } from "../redux/auth/operations";
import { Layout } from "./Layout";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";
import { useAuth } from "../hooks/useAuth";
import Loader from "./Loader";

const Home = lazy(() => import("../Pages/Home"));
const LogIn = lazy(() => import("../Pages/Login"));
const Register = lazy(() => import("../Pages/Register"));
const Contacts = lazy(() => import("../Pages/Contacts"));

const NotFoundPage = lazy(() => import("../Pages/NotFoundPage"));

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <div className="wraper">
      {loading && (
        <div className="loader">
          <div className="load">
            <Loader />
          </div>
        </div>
      )}
      {error && <Toaster position="top-center" />}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<Register />}
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute redirectTo="/contacts" component={<LogIn />} />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute redirectTo="/login" component={<Contacts />} />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
