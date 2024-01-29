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
      <div>
        <i className="fa-solid fa-house icon-home"></i>
        <Link to="/" className={`navbar-home ${selectedLink === "home" ? "selected" : ""}`} onClick={() => setSelectedLink("home")}> Home </Link>
      </div>
      {user?.admin ? (
        <div>
          <i class="fa-solid fa-users-gear icon-alluser"></i>
          <Link to="/user" className={`navbar-alluser ${selectedLink === "alluser" ? "selected" : ""}`} onClick={() => setSelectedLink("alluser")}> User </Link>
        </div>

      ) : (
        <></>
      )}

      {user?.admin ? (
        <div>
          <i class="fa-solid fa-trash-can icon-allbin"></i>
          <Link to="/bin" className={`navbar-allbin ${selectedLink === "allbin" ? "selected" : ""}`} onClick={() => setSelectedLink("allbin")}> Bin </Link>
        </div>

      ) : (
        <></>
      )}

      {user ? (
        <>
          <div>
            <i className="far fa-user-circle icon-user"></i>
            <Link to={`/user-information/${user._id}`} className={`navbar-user ${selectedLink === "user" ? "selected" : ""}`} onClick={() => setSelectedLink("user")}> <p>Hi, <span>{user.username}</span> </p> </Link>
          </div>
          <div>
            <i className="fa-solid fa-right-to-bracket icon-logout"></i>
            <Link to="/logout" className="navbar-logout" onClick={handleLogout}> Log out</Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <i class="fa-solid fa-arrow-right-to-bracket icon-login"></i>
            <Link to="/login" className={`navbar-login ${selectedLink === "login" ? "selected" : ""}`} onClick={() => setSelectedLink("login")}> Login </Link>
          </div>
          <div>
            <i class="fa-solid fa-user-plus icon-register"></i>
            <Link to="/register" className={`navbar-register ${selectedLink === "register" ? "selected" : ""}`} onClick={() => setSelectedLink("register")}> Register</Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBar;