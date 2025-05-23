import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchUsers,
  updateUserRole,
} from "../store/features/users/userSlice";

const UserInfo = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleRoleChange = (id, newRole) => {
    // Ensure newRole is either 'admin' or 'member'
    if (["admin", "member"].includes(newRole)) {
      dispatch(updateUserRole({ id, role: newRole }));
    } else {
      console.error("Invalid role selected");
    }
  };

  if (role !== "admin") {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div className="box-form">
      <div className="info-user">
        <h1>User Management</h1>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDelete(user._id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInfo;
