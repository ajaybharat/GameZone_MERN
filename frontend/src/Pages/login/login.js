import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
// import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
//   const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    // dispatch({ type: "LOGIN_START" });
    try {
      debugger;
      const res1 = await axios.get('https://node-rest-api7.herokuapp.com/api/users');
      res1.data[0].name;
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      debugger;
    //   dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
    //   dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" >
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}