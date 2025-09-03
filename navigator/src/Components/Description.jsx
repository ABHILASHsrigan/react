import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const Description = () => {

    const { id } = useParams();
    const [data,setdata] = useState({})
 
    async function fetchDataforDescription()
    {
        try {
            // http://localhost:5173/description/2
            const res = await axios.get(`http://localhost:3000/product/${id}`)
            setdata(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchDataforDescription()
    },[data])

  return (

    <div style={{width:"50%",textAlign:"center",margin:"auto"}}>
      <div>
        <img src={data.image} alt={data.title} style={{ width: "300px" }} />
      </div>
      <div>
        <h3>{data.title}</h3>
        <span>Price : ₹{data.price}</span>
        <p>{data.description}</p>
      </div>
      <div style={{marginTop:"10px"}}>
        <Link to={`/addproduct/${data.id}`}>
                 <button style={{ padding: "10px 20px", backgroundColor: "white", fontWeight: "700", marginRight: "15px" }}>
                   Add to Cart
                 </button>
               </Link>
        <button style={{padding:"10px 20px",backgroundColor:"white",fontWeight:"700"}}>Buy Now</button>
      </div>
    </div>

  )
}

export default Description
