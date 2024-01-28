import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { updateBin, deleteBin, getAllBins } from "../../redux/apiRequest";
import "./binUpdate.css";

const BinUpdate = () => {
    const { binId } = useParams();
    const binList = useSelector((state) => state.bin.bins?.allBins);
    const [ip, setIp] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [updateTrigger, setUpdateTrigger] = useState(0);

    const findBinById = (binsArray, targetId) => {
        return binsArray.find(bin => bin._id === targetId);
    };
    const currentBin = findBinById(binList.bins, binId);


    const handleUpdate = async (e) => {
        e.preventDefault();
        const newBin = {
            idBin: binId,
            ip: ip,
            lat: lat,
            lng: lng,
        };
        try {
            await updateBin(dispatch, newBin);
            await getAllBins(dispatch);
        } catch (error) {
            console.error("Error updating bin:", error);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có đồng ý xoá thùng rác này không??")) {
            deleteBin(dispatch, id, navigate);
        }
    }

    return (
        <main className="userUpdate-container">
            <div className="userUpdate-container_top">
                <div className="userInfo-title">Thông tin thùng rác</div>
                <div className="binUpdate-Info">
                    {currentBin && (
                        <div>
                            <div style={{ margin: '0px', justifyContent: 'center', fontWeight: 950, fontSize: '1.3rem' }}>
                                <i className="fa-regular fa-trash-can fa-2x"></i>
                            </div>
                            <div>
                                <div style={{ marginTop: '3px' }}>
                                    <div><strong>IP:</strong></div>
                                    <div>{currentBin.ip}</div>
                                </div>
                                <div>
                                    <div><strong>Địa chỉ (lat):</strong></div>
                                    <div>{currentBin.lat}</div>
                                </div>
                                <div>
                                    <div><strong>Địa chỉ (lng):</strong></div>
                                    <div>{currentBin.lng}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div
                    className="delete-user-updateContainer"
                    onClick={() => handleDelete(binId)}
                >
                    Xoá tài khoản
                </div>
            </div>

            <div className="userUpdate-container_bottom">
                <section className="userUpdate-update">
                    <div className="userUpdate-title"> Thay đổi thông tin</div>
                    <form className="userUpdate-updateFrom" onSubmit={handleUpdate}>
                        <div>
                            <label>IP</label>
                            <input
                                type="text"
                                placeholder="Enter new ip"
                                onChange={(e) => setIp(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>LAT</label>
                            <input
                                type="text"
                                placeholder="Enter new address"
                                onChange={(e) => setLat(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>LNG</label>
                            <input
                                type="text"
                                placeholder="Enter new address"
                                onChange={(e) => setLng(e.target.value)}
                            />
                        </div>
                        <button type="submit"> Cập nhật </button>
                    </form>
                </section>
            </div>
        </main>
    )
}
export default BinUpdate;