import "./Header.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from '../images/logo.png'

const Header = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const history = useHistory();
  return (
    <>
      <div className="header">
        <div className="header__left">
          <img src={Logo} className="header__logo-img" />
        </div>
        <div className="header__pages">
          <a onClick={() => history.push("/")} className="header__page">
            <span>Home</span>
          </a>
          <a onClick={() => history.push("/buy")} className="header__page">
            <span>About Us</span>
          </a>

          <a onClick={() => history.push("/buy")} className="header__page">
            <span>Join a Class</span>
          </a>
        </div>
        <div className="header__right">
          {auth && auth.token ? (
            //signed in
            <>
              {auth.teacher && (
                <a
                  onClick={() => history.push("/teacher")}
                  className="header__page"
                >
                  <span>Teacher Dashboard</span>
                </a>
              )}
              <button
                onClick={() => history.push("/my-account")}
                className="header__button"
              >
                <b>My Account</b>
              </button>{" "}
            </>
          ) : (
            //not signed in
            <>
              <a
                onClick={() => history.push("/login")}
                className="header__page"
              >
                <span>Login</span>
              </a>
              <button
                onClick={() => history.push("/register")}
                className="btn header__button"
              >
                <b>Start for Free</b>
              </button>{" "}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
