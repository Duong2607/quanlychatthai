import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";
import { logOut } from "../../redux/apiRequest";
// import { createAxios } from "../../createInstance";
// import { logOutSuccess } from "../../redux/authSlice";

const NavBar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedLink, setSelectedLink] = useState("login");
  // let axiosJWT = createAxios(user,dispatch,logOutSuccess);

  const handleLogout = () => {
    logOut(dispatch, id, navigate, accessToken);
  }
  return (
    <nav className="navbar-container">
      <Link to="/" className={`navbar-home ${selectedLink === "home" ? "selected" : ""}`} onClick={() => setSelectedLink("home")}> Home </Link>
      {user?.admin ? (
        <Link to="/user" className={`navbar-alluser ${selectedLink === "user" ? "selected" : ""}`} onClick={() => setSelectedLink("user")}> User </Link>
      ) : (
        <></>
      )}

      {user ? (
        <>
          <p className="navbar-user">Hi, <span>  {user.username} </span> </p>
          <Link to="/logout" className="navbar-logout" onClick={handleLogout}> Log out</Link>
        </>
      ) : (
        <>
          <Link to="/login" className={`navbar-login ${selectedLink === "login" ? "selected" : ""}`} onClick={() => setSelectedLink("login")}> Login </Link>
          <Link to="/register" className={`navbar-register ${selectedLink === "register" ? "selected" : ""}`} onClick={() => setSelectedLink("register")}> Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;