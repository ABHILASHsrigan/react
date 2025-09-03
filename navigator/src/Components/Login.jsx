import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthorizationContext } from '../Contexts/Authorization.jsx';

function Login() {

  const {token , settoken} = useContext(AuthorizationContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const HandeLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://reqres.in/api/login",
        {
          email: email,
          password: password
        },
        {
          headers: {
            "x-api-key": "reqres-free-v1"
          }
        }
      );
      settoken(res.data.token)
      localStorage.setItem("token",res.data.token);
      
    } catch (error) {
      alert(error.response.data.error);
    }
  }

  return token ? <h1 style={{textAlign:"center",margin:"50px 0px"}}>Login Successful...</h1> : 
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <p>eve.holt@reqres.in</p>
      <form onSubmit={(e) => HandeLogin(e)} action="" style={{ width: "500px", padding: "50px" }}>
        <h1 style={{ textAlign: "center", margin: "20px 0px 30px 0px" }}>Login</h1>
        <label style={{ width: "100%", margin: "10px 0px" }} htmlFor="">E-Mail</label>
        <input style={{ width: "100%", height: "35px", margin: "10px 0px", borderRadius: "10px", padding: "20px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email" />
        <label style={{ width: "100%", margin: "10px 0px" }} htmlFor="">Password</label>
        <input style={{ width: "100%", height: "35px", margin: "10px 0px", borderRadius: "10px", padding: "20px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password" />
        <input type="submit" className='btn btn-primary' style={{ margin: "30px auto", width: "100%", fontWeight: "700", padding: "10px", fontSize: "18px" }} />
      </form>
    </div>
}

export default Login
