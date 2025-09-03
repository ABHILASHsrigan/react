import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Product() {

  const [ProductData, setProductData] = useState([])
  const [search, setsearch] = useState("")
  const [category,setcategory] = useState("")
  const [sort, setsort] = useState("")

  async function FetchDataFromServer() {
    try {

      let query = [];

      if (search) {
         const res = await axios.get(`http://localhost:3000/product?q=${search}`)
        setProductData(res.data)
      }
      if (category) {
        const res = await axios.get(`http://localhost:3000/product?category=${category}`)
        setProductData(res.data)
      }
      if (sort) {
         const res = await axios.get(`http://localhost:3000/product?_sort=price&_order=${sort}`)
        setProductData(res.data)
      }
      
      // const res = await axios.get("http://localhost:3000/product")
      // setProductData(res.data)

      if (!(search || category || sort))
      {
        const res = await axios.get("http://localhost:3000/product")
        setProductData(res.data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    FetchDataFromServer()
  }, [search, category, sort])

  return (
    <div className='container'>
      <h1 style={{ margin: "30px 0px" }}>Product</h1>

      <div style={{display:"flex"}}>
        <div style={{marginRight:"20px",width:"30%"}}>
          <hr />
          <div style={{ margin: "10px 0px" ,display:"flex"}}>
            <input type="text" onChange={(e)=>setsearch(e.target.value)} style={{padding:"10px"}} />
            <button>search</button>
          </div>
          <hr />
          <div>
            <p>Sort</p>
            <button onClick={() => setsort("asc")} style={{marginRight:"10px"}}>Low to High</button>
            <button onClick={() => setsort("desc")}>High to Low</button>
          </div>
          <hr />
          <div>
            <p>Filter</p>
            <select onChange={(e)=>setcategory(e.target.value)} name="" id="">
              <option value="">Selet the category</option>
              <option value="women's clothing">Women</option>
              <option value="men's clothing">Men</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
            </select>
          </div>
        </div>

        <div className='container' style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
          {ProductData.map((el, i) => {
            return (
              <Card style={{ width: '300px', margin: "15px 0px" }}>
                <Card.Img variant="top" src={el.image} style={{ width: "100%", height: "350px", padding: "10px" }} />
                <Card.Body>
                  <Card.Title>{el.title}</Card.Title>
                  <Card.Text>
                    {el.price}
                  </Card.Text>
                  <Link to={`/description/${el.id}`}>
                    <Button variant="primary">Add To Cart</Button>
                  </Link>
                </Card.Body>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Product
