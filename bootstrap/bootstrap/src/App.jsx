import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>

        <table>
          <tr>
            <td> <h1 style={{color:"red", position : "absolute" ,left: "200px"}}> Hi, hi , I'm Jhon Deo</h1>
            
            <h3 style={{ width: "480px",color:"black", position : "absolute" ,left: "200px", top : "380px"}}>only works in terminal but do not works properly that why "I Am Future Back-End Developer" with no scope of job</h3>
            <button style={{ width : "160px",position : "absolute" ,left: "170px", top : "440px", backgroundColor :"blue", color : 'white' , margin : "30px" ,padding : "20px"}}>Follow</button>


           <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16" style={{color: " gray", position : "absolute" ,left: "200px", top : "580px"}}>
                 <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
          </svg>


          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16" style={{color: " gray", position : "absolute" ,left: "250px", top : "580px"}}>
                 <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
          </svg>








            <span></span></td>
            <td><img src="https://static.vecteezy.com/system/resources/thumbnails/045/821/312/small_2x/a-cheerful-man-in-a-white-t-shirt-and-jeans-waves-with-a-friendly-smile-png.png" alt=""  style={{width:"450px",height:"500px", marginLeft:"650px", marginTop:"100px"}}/></td>
          </tr>
        </table>
      </div>
    </>
  )
}

export default App
