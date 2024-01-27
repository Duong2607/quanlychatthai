import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../../redux/apiRequest";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import * as jwt_decode from "jwt-decode";
import "./home.css";

const HomePage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.user.users?.allUsers);
  const msgDelete = useSelector((state) => state.user?.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // let axiosJWT = axios.create();

  // const refreshToken = async () => {
  //   try {
  //     const res = await axios.post("/v1/auth/refresh", {
  //       withCredentials: true,
  //     });
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     let date = new Date();
  //     const decodedToken = jwt_decode(user?.accessToken);
  //     if (decodedToken.exp < date.getTime() / 1000) {
  //       const data = await refreshToken();
  //       const refreshUser = {
  //         ...user,
  //         accessToken: data.accessToken,
  //       };
  //       dispatch(loginSuccess(refreshUser));
  //       config.headers["token"] = "Bearer " + data.accessToken;
  //     }
  //     return config;
  //   },
  //   (err) => {
  //     return Promise.reject(err);
  //   }
  // );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch);
    }
  }, [msgDelete]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure??")) {
      deleteUser(user?.accessToken, dispatch, id);
    }
  }

  const handleUpdate = (id) => {
    navigate(`/user/update/${id}`)
  }


  return (
    <main className="home-container">
      <div className="home-title">Danh sách tài khoản</div>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container">
              <Link to={`#`} className="home-user">
                <div>{user.admin ? "Admin" : "User"}</div>
                <div style={{fontWeight: 950, fontSize: '1.1rem'}} >{user.username}</div>
                <div style={{fontWeight: 750, fontSize: '0.7rem', marginTop: '7px', overflowWrap: 'break-word', }}>{user.email}</div>
              </Link>
              <div className="user-sua-xoa">
                <div
                  className="sua-user"
                  onClick={() => handleUpdate(user._id)}>
                  Sửa
                </div>
                <div
                  className="delete-user"
                  onClick={() => handleDelete(user._id)}>
                  Xoá
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
