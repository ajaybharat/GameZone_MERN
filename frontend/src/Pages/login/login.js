import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link,Redirect } from "react-router-dom";
import "./login.css";
import { connect } from 'react-redux'
import { fetchUsers,fetchUsersSuccess,fetchUsersFailure,fetchUsersRequest } from '../../redux/index'

function Login(props) {
  const userRef = useRef();
  const passwordRef = useRef();
  const [redirectstate,setredirectstate] = useState(false);
//   const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.fetchuserreq();
    try {
      const res = await axios.post("/auth/login", {
        email: userRef.current.value,
        password: passwordRef.current.value,
      });
      let snakegamescore = res.data.sankeGameScore;
      let game2048 = res.data.Game2048Score;
      console.log(snakegamescore);
      console.log(game2048);
      localStorage.setItem('user',JSON.stringify(res.data));
      localStorage.setItem('snakegame',snakegamescore);
      localStorage.setItem('2048game',game2048);
      props.fetchsuccess(res.data);
      setredirectstate(true);
      window.location.replace("/");
    } catch (err) {
      props.fetchfailure(err);
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your email..."
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

const mapStatetoProps = state => {
  return {
      Users: state.user
  }
}

const mapDispatchtoProps = dispatch => {
  return {
      fetchuserreq: () => dispatch(fetchUsersRequest()),
      fetchsuccess: (payload) => dispatch(fetchUsersSuccess(payload)),
      fetchfailure: () => dispatch(fetchUsersFailure())
  }
}


export default connect(mapStatetoProps, mapDispatchtoProps)(Login)
