import axios from "axios";
import {Redirect} from 'react-router-dom'

const Logout = () => {
    async function handlelogout() {
        try{
            let user_Data = JSON.parse(localStorage.getItem('user'));
            let res = await axios.put(`/user/${user_Data._id}`,{
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
    return <button onClick = {handlelogout}>Logout</button>
};

export default Logout;