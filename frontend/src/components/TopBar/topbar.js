import { Link } from "react-router-dom";
import "./topbar.css";
import axios from 'axios'

export default function Topbar() {
    var user = localStorage.getItem('user') || null;
    async function handlelogout() {
        try{
          
            let user_Data = JSON.parse(localStorage.getItem('user'));
            let res = await axios.put(`https://gamezone-user-api.herokuapp.com/api/user/${user_Data._id}`,{
                sankeGameScore: localStorage.getItem('snakegame'),
                Game2048Score: localStorage.getItem('2048game')
            })
            localStorage.removeItem('snakegame')
            localStorage.removeItem('2048game')
            localStorage.removeItem('user')
            console.log(res.data);
            window.location.replace("/login");
        }
        catch(err) {
            console.log(err);
        }
        
    }
  return (
    <div className="top">
      <div className="topLeft">
          <h1 className="maintitle">Game Zone</h1>
        <i className="topIcon fab fa-steam"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem"><Link className="link" to="/">
              ABOUT
            </Link></li>
          <li className="topListItem"><Link className="link" to="/">
              CONTACT
            </Link></li>
          {/* {user && <li className="topListItem">LOGOUT</li>} */}
        </ul>
      </div>
      <div className="topRight">
              {user? (<ul className="topList"><li className="topListItem">
            <p className="link" onClick = {handlelogout}>LOGOUT</p>
          </li></ul>) : (<ul className="topList"><li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li></ul>)}
        {/* {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          </Link>
        ) : (
          
        )} */}
      </div>
    </div>
  );
}