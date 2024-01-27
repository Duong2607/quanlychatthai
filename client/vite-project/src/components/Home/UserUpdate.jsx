import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateUser, deleteUser } from "../../redux/apiRequest";
import "./userUpdate.css";

const User = () => {
    const { userId } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const userInfo = useSelector((state) => state.user.user?.userr);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [admin, setAdmin] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleDelete = (id) => {
        deleteUser(user?.accessToken, dispatch, id, navigate)
    }

    return (
        <main className="userUpdate-container">
            <div className="userUpdate-container_top">
            <div className="userInfo-title">Thông tin tài khoản</div>
            <div className="userUpdate-Info">
                {userInfo && (
                    <div>
                        <div style={{ margin: '0px'}}>
                            <strong style={{ marginLeft: '130px', fontWeight: 950, fontSize: '1.3rem' }}>
                                {userInfo.admin ? "Admin" : "User"}
                            </strong>
                        </div>
                        <div style={{ marginTop: '3px'}}>
                            <div><strong>Tên người dùng:</strong></div>
                            <div>{userInfo.username}</div>
                        </div>
                        <div>
                            <div><strong>Email:</strong></div>
                            <div>{userInfo.email}</div>
                        </div>
                        <div>
                            <div><strong>Mật khẩu:</strong></div>
                            <div>{userInfo.password}</div>
                        </div>
                    </div>
                )}
            </div>
            <div
                className="delete-user-updateContainer"
                onClick={() => handleDelete(userId)}
            >
                Xoá tài khoản
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
                    <div>
                        <label style={{ marginRight: '56px' }}>ADMIN</label>
                        <input
                            type="admin"
                            placeholder="True or False"
                            // required
                            // value={userInfo.admin}
                            onChange={(e) => setAdmin(e.target.value)}
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
export default User;