import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addBin } from "../../redux/apiRequest";
import "./addNewBin.css";

const AddNewBin = () => {
    const [ip, setIp] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [address, setAddress] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAdd = async (e) => {
        e.preventDefault();
        const newBin = {
            ip: ip,
            lat: lat,
            lng: lng,
            address: address,
        };
        try {
            await addBin(dispatch, newBin, navigate);
        } catch (error) {
            console.error("Error updating bin:", error);
        }
    };

    return (
        <main className="binAdd-container">
                <section className="binAdd-Add">
                    <div className="binAdd-title"> Thêm thùng rác</div>
                    <div className="iconAddBin">
                        <i class="fa-solid fa-trash-can fa-3x" style={{marginLeft: '38px'}}></i>
                        <i class="fa-solid fa-plus fa-2x"></i>
                    </div>

                    <form className="userUpdate-updateFrom" onSubmit={handleAdd}>
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
                        <div>
                            <label>ADDRESS</label>
                            <input
                                type="text"
                                placeholder="Enter new address"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <button type="submit"> Thêm </button>
                    </form>
                </section>
        </main>
    )
}
export default AddNewBin;