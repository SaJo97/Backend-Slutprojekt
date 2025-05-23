import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { logout } from "../store/features/auth/authSlice"; // Ensure this import is correct


const Account = () => {
  const { token, email, role } = useSelector((state) => state.auth); // Only select the token from the state
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate("/login"); // Redirect to the login page
  };

  // console.log("Account component rendered with email:", email);
  return (
    <div>
      <div className="account">
        <h1>Account Information</h1>
        {token ? ( // Check if the token exists to determine if the user is logged in
          <div>
            <p>Email: {email}</p>
            <p>Token: {token}</p>
            {/* <p>You are logged in!</p> */}
            <p>Role: {role}</p>
            <Link to={"/orderHistory"}>Order History</Link>
            <button onClick={handleLogout} className="account-btn">
              Logout
            </button>
          </div>
        ) : (
          <p>You are not logged in.</p>
        )}
      </div>
    </div>
  );
};

export default Account;
