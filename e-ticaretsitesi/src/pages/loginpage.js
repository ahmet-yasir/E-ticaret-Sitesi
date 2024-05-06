import {React,  useState } from 'react'
import { useParams } from 'react-router-dom';
import "../style/login.css"

function Loginpage() {
  const { id } = useParams(); 
  const [isturn,setturn] = useState(false);
  function turncard () {
    setturn(!isturn);
  }
  return (
    <>
      <button onClick={turncard}>tıkla</button>
      <div className={'Logincard '+((isturn) ? "Logincardactive":"")}>
        <div className='Loginfront'>
          <div>
            dasdsad
          </div>
        </div>
        <div className='Loginback'>
          <div>
            aaaaaaaaaaaaaaaaaaa
          </div>
        </div>
      </div>
    </>
  )
}
export default Loginpage;