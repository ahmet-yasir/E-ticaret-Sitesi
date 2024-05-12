import {React,  useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom';
import {ErrorInput, Input} from '../components/input';
import Toast from 'react-bootstrap/Toast';
import { IoCloseCircleOutline } from "react-icons/io5";
import "../style/login.css"

function Loginpage() {
  const { id } = useParams(); 
  const [isturn,setturn] = useState(false);
  const [password,setPassword] = useState('');
  const [passwordErr,setPasswordErr] = useState(false);
  const [passwordControl,setPasswordControl] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Giriş yapılamadı");
  let active = 0;
  useEffect(()=>{
    if(passwordControl !== password){
      setShowToast(true);
      setToastMessage("Parola Uyuşmuyor");
    }
    else{
      setShowToast(false);
      setToastMessage("Parola Uyuşmuyor");
    }
  },[passwordControl, password]);

  useEffect(()=>{
    if(password.length > 0){
      if(password.length < 8){
        setPasswordErr(true);
      }
      else{
        setPasswordErr(false);
      }
    }
    else{
      setPasswordErr(false);
    }
      
  },[password]);

  function turncard () {
    setturn(!isturn);
  }

  


  return (
    <>
      <div className='d-flex flex-column justify-content-center align-items-center pb-0' style={{minHeight:'100vh', width:'100%', background:'#cff'}}>
      <Toast show={showToast} className='position-fixed top-0 mt-5 text-white' style={{background:'#ff2d2d'}}>
        <Toast.Body className='w-100 text-center text-white bg-transparent position-relative'>
          <div className='w-100'>{toastMessage}</div>
          <IoCloseCircleOutline onClick={()=>setShowToast(false)} className='position-absolute fs-2' style={{right:'12px', top:'8px', cursor:'pointer'}}/>
        </Toast.Body>
      </Toast>
        <div className={'bg-white Logincard '+((isturn) ? "Logincardactive":"")}>
          <div className='Loginfront'>
            <div className='p-3 pt-5'>
              <h4 className='fw-bold mt-5'>Giriş Yap</h4>
                <form className='d-flex flex-column gap-2'>
                  <label className='w-100 text-start'>E-posta</label>
                  <input className='form-control form-control-sm' type='email'/>
                  <label className='w-100 text-start'>Şifre</label>
                  <input className='form-control form-control-sm mb-3' type='password'/>
                  <button className='btn btn-outline-primary w-100 shadow'>Giriş Yap</button>
                  <button className='btn btn-outline-danger w-100 shadow'>Google ile Giriş</button>
                </form>
                <p className='mt-3'>Kayıt olmak için <Link onClick={turncard} className='text-decoration-none'>tıklayınız</Link></p>
            </div>
          </div>
          <div className='Loginback'>
            <div className='p-3'>
              <h4 className='fw-bold'>Kayıt Ol</h4>
              <form className='d-flex flex-column gap-1'>
                  <label className='w-100 text-start'>Ad</label>
                  <input className='form-control form-control-sm' type='text'/>
                  <label className='w-100 text-start'>Soyad</label>
                  <input className='form-control form-control-sm' type='text'/>
                  <label className='w-100 text-start'>E-posta</label>
                  <input className='form-control form-control-sm' type='email'/>
                  <Input
                    type="password"
                    label="Şifre"
                    value={password}
                    setValue={setPassword}
                  />
                  <ErrorInput
                    isShow={passwordErr}
                    type="password"
                    message="Şifreniz büyük, küçük harf ve rakamlardan oluşmalıdır. Minimum 8 karakter içermelidir."
                    label="Şifre"
                    value={password}
                    setValue={setPassword}
                  />
                  <ErrorInput
                    isShow={false}
                    type="password"
                    message="Şifre eşleşmiyor."
                    label="Şifre"
                    value={passwordControl}
                    setValue={setPasswordControl}
                  />
                  <button className='btn btn-outline-primary'>Kayıt Ol</button>
                  <button className='btn btn-outline-danger'>Google ile Kayıt Ol</button>
                </form>
                <p className='mt-3'>Giriş yapmak için <Link onClick={turncard} className='text-decoration-none'>tıklayınız</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Loginpage;