import {React,  useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom';
import {ErrorInput, Input} from '../components/input';
import Toast from 'react-bootstrap/Toast';
import { IoCloseCircleOutline } from "react-icons/io5";
import "../style/login.css"
import api from "../utils/api"
import { GoogleOAuth } from '../components/oauth';

function Loginpage() {
	const [isturn,setturn] = useState(false);
	const [registerPassword,setRegisterPassword] = useState('');
	const [loginPassword,setLoginPassword] = useState('');
	const [registerEmail,setRegisterEmail] = useState('');
	const [loginEmail,setLoginEmail] = useState('');
	const [surname,setSurname] = useState('');
	const [name,setName] = useState('');
	const [registerPasswordErr,setRegisterPasswordErr] = useState(false);
	const [registerPasswordControl,setRegisterPasswordControl] = useState('');
	const [registerPasswordControlErr,setRegisterPasswordControlErr] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("Giriş yapılamadı");

	const handleLogin = async (e) => {
		e.preventDefault();
		await api.post('/login', { 
			email: loginEmail, 
			password : loginPassword
		}
		).then((response) => {
			if (response.status === 200) {
				// yönlendirme yapılacak
				console.log("dsadsada")
			}
		}).catch((error) => {
			if(error.response && error.response.status === 401){
				setShowToast(true);
				setToastMessage("E-posta adresi veya şifre hatalı!");
			}
			else{
				setShowToast(true);
				setToastMessage("Bir hata oluştu!");
			}
		});
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		if(!isValidPassword(registerPassword)){
			if(name === '' || surname === ''){
				setShowToast(true);
				setToastMessage("Ad ve soyad boş bırakılamaz.");
			}
			else{
				await api.post('/register', {
					name: name,
					surname: surname,
					email: registerEmail, 
					password : registerPassword
				}
				).then((response) => {
					if (response.status === 201) {
						//yönlendirme yapılacak
						setShowToast(true);
						setToastMessage("Kayıt Başarılı!");
					}
					console.log(response)
				}).catch((error) => {
					if (error.response && error.response.status === 400){
						setShowToast(true);
						setToastMessage("Bu e-posta adresi kullanılıyor.");
					}
					else{
						setShowToast(true);
						setToastMessage("Bir hata oluştu!");
					}
				});
			} 
		}
		else {
			setShowToast(true);
			setToastMessage("Geçersiz şifre!");
		}
	};

	function isValidPassword(password){
		const hasLowerCase = /[a-z]/.test(registerPassword);
		const hasUpperCase = /[A-Z]/.test(registerPassword);
		const hasNumber = /[0-9]/.test(registerPassword);
		const isValidPassword = registerPassword.length >= 8 && hasLowerCase && hasUpperCase && hasNumber;
		return (!isValidPassword);
	}

	useEffect(()=>{
		if (registerPassword.length > 0 && isValidPassword(registerPassword)){
			setRegisterPasswordErr(true);
		}
		else {
			setRegisterPasswordErr(false);
		}
	},[registerPassword]);

	useEffect(()=>{
		if (registerPasswordControl !== registerPassword && registerPasswordControl.length > 0) {
			setRegisterPasswordControlErr(true);
		}
		else {
			setRegisterPasswordControlErr(false);
		}
	},[registerPasswordControl]);

	function turncard () {
		setturn(!isturn);
	}

	async function handleOAuthLogin(data){
		console.log(data)
		await api.post('/login-google', { 
			email: data.email, 
			token : data.sub
		}
		).then((response) => {
			if (response.status === 200) {
				console.log("success")
				// yönlendirme yapılacak
			}
		}).catch((error) => {
			if(error.response && error.response.status === 401){
				setShowToast(true);
				setToastMessage("E-posta adresi kayıtlı değil.");
			}
			else{
				setShowToast(true);
				setToastMessage("Bir hata oluştu!");
			}
		});
	}
	
	async function  handleOAuthRegister(data){
		console.log(data)
		await api.post('/register-google', {
			name: data.given_name,
			surname: data.family_name,
			email: data.email, 
			token : data.sub
		}
		).then((response) => {
			if (response.status === 201) {
			//yönlendirme yapılacak
				setShowToast(true);
				setToastMessage("Kayıt Başarılı!");
			}
			console.log(response)
		}).catch((error) => {
			if (error.response && error.response.status === 400){
				setShowToast(true);
				setToastMessage("Bu e-posta adresi kullanılıyor.");
			}
			else{
				setShowToast(true);
				setToastMessage("Bir hata oluştu!");
			}
		});
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
						<form className='d-flex flex-column gap-2' onSubmit={(e)=>handleLogin(e)}>
							<Input
								type="email"
								label="E-posta"
								value={loginEmail}
								setValue={setLoginEmail}
							/>
							<Input
								type="password"
								label="Şifre"
								value={loginPassword}
								setValue={setLoginPassword}
							/>
							<button className='btn btn-outline-primary w-100 shadow mt-2'>Giriş Yap</button>
						</form>
						<GoogleOAuth handleOAuth={handleOAuthLogin} label="Google ile giriş yap"/>
						<p className='mt-3'>Kayıt olmak için <Link onClick={turncard} className='text-decoration-none'>tıklayınız</Link></p>
					</div>
				</div>
				<div className='Loginback'>
					<div className='p-3'>
						<h4 className='fw-bold'>Kayıt Ol</h4>
						<form className='d-flex flex-column gap-1' onSubmit={(e)=>handleRegister(e)}>
							<Input
								type="text"
								label="Ad"
								value={name}
								setValue={setName}
							/>
							<Input
								type="text"
								label="Soyad"
								value={surname}
								setValue={setSurname}
							/>
							<Input
								type="email"
								label="E-posta"
								value={registerEmail}
								setValue={setRegisterEmail}
							/>
							<ErrorInput
								isShow={registerPasswordErr}
								type="password"
								message="Şifreniz büyük, küçük harf ve rakamlardan oluşmalıdır. Minimum 8 karakter içermelidir."
								label="Şifre"
								value={registerPassword}
								setValue={setRegisterPassword}
							/>
							<ErrorInput
								isShow={registerPasswordControlErr}
								type="password"
								message="Şifre eşleşmiyor."
								label="Şifre tekrar"
								value={registerPasswordControl}
								setValue={setRegisterPasswordControl}
							/>
							<button className='btn btn-outline-primary shadow mt-3'>Kayıt Ol</button>
						</form>
						<GoogleOAuth handleOAuth={handleOAuthRegister} label="Google ile kayıt ol"/>
						<p className='mt-3'>Giriş yapmak için <Link onClick={turncard} className='text-decoration-none'>tıklayınız</Link></p>
					</div>
				</div>
			</div>
		</div>
	</>
  )
}
export default Loginpage;