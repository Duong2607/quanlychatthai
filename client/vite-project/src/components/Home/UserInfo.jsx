import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateUser, deleteUser } from "../../redux/apiRequest";
import "./userUpdate.css";

const UserInfo = () => {
    const { userId } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const userInfo = useSelector((state) => state.user.user?.userr);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [admin, setAdmin] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            getUser(user?.accessToken, dispatch, userId);
        }
    }, []);
    console.log(userInfo)

    const handleUpdate = (e) => {
        e.preventDefault();
        const udUser = {
            username: username,
            email: email,
            password: password,
            admin: admin,
        };
        updateUser(user?.accessToken, dispatch, userId, udUser);
    };

    return (
        <main className="userUpdate-container">
            <div className="userUpdate-container_top">
                <div className="userInfo-title">Thông tin tài khoản</div>
                <div className="userUpdate-Info">
                    {userInfo && (
                        <div>
                            <div style={{ margin: '0px', justifyContent: 'center', fontWeight: 950, fontSize: '1.3rem' }}>
                                {userInfo.admin ? "Admin" : "User"}
                            </div>
                            <div>
                                <div style={{ marginTop: '3px' }}>
                                    <div style={{ width: '140px', display: 'flex', justifyContent: 'flex-start' }}><strong>Tên người dùng:</strong></div>
                                    <div>{userInfo.username}</div>
                                </div>
                                <div>
                                    <div><strong>Email:</strong></div>
                                    <div>{userInfo.email}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="userUpdate-container_bottom">
                <section className="userUpdate-update">
                    <div className="userUpdate-title"> Thay đổi thông tin</div>
                    {/* {userInfo && ( */}
                    <form className="userUpdate-updateFrom" onSubmit={handleUpdate}>
                        <div>
                            <label>USERNAME</label>
                            <input
                                type="text"
                                placeholder="Enter new username"
                                // required
                                // value={userInfo.username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label style={{ marginRight: '56px' }}>EMAIL</label>
                            <input
                                type="email"
                                placeholder="Enter new email"
                                // required
                                // value={userInfo.email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>PASSWORD</label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                // required
                                // value={userInfo.password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit"> Cập nhật </button>
                    </form>
                    {/* )}  */}
                </section>
            </div>
        </main>
    )
}
export default UserInfo;