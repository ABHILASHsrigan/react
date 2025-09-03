import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  const isLoggedIn = localStorage.getItem("token") ? false : true;
  const PageData = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "Product", path: "/product" },
    { id: 3, title: "Add Product", path: "/addproduct" },
  ]

  return (
    <div className='container m-auto' style={{width:"60%",display:"flex",justifyContent:"space-between",alignContent:"center",paddingTop:"10px"}}>

      {PageData.map((el, i) => {
        return (
          <nav key={el.id} style={{height:"40px",lineHeight:"40px",fontSize:"18px"}}>
            <NavLink style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? 'blue' : 'black',
              fontWeight: isActive ? 'bold' : 'normal',
            })} key={el.id} to={el.path}>{el.title}</NavLink>
          </nav>
        )
      })}
      {/* <button style={{height:"40px",fontSize:"18px",backgroundColor:"white",border:"none"}}>
        {!localStorage.getItem("token") ? "Login" : "Logout"}
      </button> */}

    {isLoggedIn ? (
        <button
          style={{
            height: "40px",
            fontSize: "18px",
            backgroundColor: "white",
            border: "none",
          }}
        >
          <NavLink
            to="/login"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "blue" : "black",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            Login
          </NavLink>
        </button>
      ) : (
        <button
        onClick={()=>{
          localStorage.removeItem("token")
        }}
          style={{
            height: "40px",
            fontSize: "18px",
            backgroundColor: "white",
            border: "none",
          }}
        >
          Logout
        </button>
      )}

    </div>
  )
}

export default Navbar
