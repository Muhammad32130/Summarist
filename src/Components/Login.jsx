import loginimg from '../images/login.webp'
function Login({setmodal}) {
  return (
    <div className='row'>
        <div className="settings__login--wrapper">
            <img src={loginimg} alt="" />
            <div className="settings__login--text">Log in to your account to see your details.</div>
            <button onClick={()=>{setmodal(true)}} className='btn settings__login--btn'>Login</button>
        </div>
    </div>
  )
}

export default Login