import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../../redux/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";

const HomePage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.user.users?.allUsers);
  const msgDelete = useSelector((state) => state.user?.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {user.admin ? (<i class="fa-solid fa-user fa-2x"></i>
                  ) : ( <i class="fa-regular fa-user fa-2x"></i>)}
                  <div style={{ fontWeight: 650, fontSize: '1.2rem', marginLeft: '7px' }}>{user.admin ? "Admin" : "User"}</div>
                </div>
                <div style={{ fontWeight: 950, fontSize: '1.1rem', marginTop: '7px' }} >{user.username}</div>
                <div style={{ fontWeight: 750, fontSize: '0.7rem', marginTop: '7px', overflowWrap: 'break-word', }}>{user.email}</div>
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
