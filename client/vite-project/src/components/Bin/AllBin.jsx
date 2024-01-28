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
  }, [msgDelete]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure??")) {
      deleteBin(dispatch, id);
    }
  }

  const handleUpdate = (id) => {
    navigate(`/bin/update/${id}`)
  }


  return (
    <main className="homeBin-container">

      <Link to={"/bin/add"} className="homeBin-title-container">
        <div className="homeBin-title">Danh sách thùng rác</div>
        <div className="addNewBin-container">
          <div style={{ display: 'flex', alignItems: 'flex-start', color: "#fff" }}>
            <i class="fa-solid fa-trash-can fa-2x"></i>
            <i class="fa-solid fa-plus"></i>
          </div>
          <div className="addNewBin"> Thêm thùng rác </div>
        </div>
      </Link>

      <div className="home-userlist">
        {binList.bins?.map((bin) => {
          return (
            <div className="bin-container">
              <Link to={`#`} className="home-bin">
                <div><i className="fa-regular fa-trash-can fa-2x"></i></div>
                <div style={{ fontWeight: 950, fontSize: '1rem' }} >{bin.ip}</div>
                <div style={{ fontWeight: 750, fontSize: '0.7rem', overflowWrap: 'break-word', }}>{bin.lat}</div>
                <div style={{ fontWeight: 750, fontSize: '0.7rem', overflowWrap: 'break-word', }}>{bin.lng}</div>
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
