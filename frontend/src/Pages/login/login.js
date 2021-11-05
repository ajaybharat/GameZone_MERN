import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { connect } from 'react-redux'
import { fetchUsersSuccess,fetchUsersFailure,fetchUsersRequest } from '../../redux/index'

function Login(props) {
  const userRef = useRef();
  const passwordRef = useRef();
  const [redirectstate,setredirectstate] = useState(false);
//   const { dispatch, isFetching } = useContext(Context);



// useEffect(()=> {
//   props.fetchfailure(errorr);
// },[props.User]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.fetchfailure('');
    props.fetchuserreq();
    try {
      
      const res = await axios.post("https://gamezone-user-api.herokuapp.com/api/auth/login", {
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
      props.fetchfailure('Something went wrong..');
      setredirectstate(false);
    }
  };

  if(props.Users.loading || redirectstate) return (<div className="login"><img 
    className="loading"
    src="https://static.vecteezy.com/system/resources/previews/001/826/248/non_2x/progress-loading-bar-buffering-download-upload-and-loading-icon-vector.jpg"
    alt=""
    /></div>)
    else return (
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
        <Link className="createAccount" to='/register'>Create Account</Link>
        {props.Users.error? <span className="errorMSG">{props.Users.error}</span> : ''}
        <button className="loginButton" type="submit" >
          Login
        </button>
      </form>
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
      fetchfailure: (err) => dispatch(fetchUsersFailure(err))
  }
}


export default connect(mapStatetoProps, mapDispatchtoProps)(Login)
