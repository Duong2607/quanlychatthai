import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBins, deleteBin } from "../../redux/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import "./allBin.css";

const AllBin = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const binList = useSelector((state) => state.bin.bins?.allBins);
  console.log(binList);
  const msgDelete = useSelector((state) => state.bin?.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getAllBins(dispatch);
    }
  },[msgDelete]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure??")) {
      deleteBin(dispatch, id);
    }
  }

  const handleUpdate = (id) => {
    navigate(`/bin/update/${id}`)
  }


  return (
    <main className="home-container">
      <div className="home-title">Danh sách thùng rác</div>
      <div className="home-userlist">
        {binList.bins?.map((bin) => {
          return (
            <div className="user-container">
              <Link to={`#`} className="home-user">
                <div><i className="fa-regular fa-trash-can fa-2x"></i></div>
                <div style={{fontWeight: 950, fontSize: '1rem'}} >{bin.ip}</div>
                <div style={{fontWeight: 750, fontSize: '0.7rem', overflowWrap: 'break-word', }}>{bin.lat}</div>
                <div style={{fontWeight: 750, fontSize: '0.7rem', overflowWrap: 'break-word', }}>{bin.lng}</div>
              </Link>

              <div className="user-sua-xoa">
                <div
                  className="sua-user"
                  onClick={() => handleUpdate(bin._id)}>
                  Sửa
                </div>
                <div
                  className="delete-user"
                  onClick={() => handleDelete(bin._id)}>
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

export default AllBin;
