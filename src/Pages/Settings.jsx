import Login from '../Components/Login'
import Modal from '../Components/Modal'
import Search from '../Components/Search'
import Sidebar from '../Components/Sidebar'

function Settings({user,premium,guestLogin, signup,Signupuser,Loginuser, setsignup, signout, modal, setmodal}) {
  return (
    <>
      <Sidebar setmodal={setmodal} user={user} signout={signout} ></Sidebar>
        <Search></Search>
    <div className="container">
      <div className="row">
<div className="section__title page__title">Settings</div>
{modal && (
        <Modal
          guestLogin={guestLogin}
          signup={signup}
          Signupuser={Signupuser}
          Loginuser={Loginuser}
          setmodal={setmodal}
          setsignup={setsignup}
        ></Modal>
      )}
   {user ?
<>
  <div className="setting__content">
    <div className="settings__sub--title">Your Subscription plan</div>
    <div className="settings__text">{premium?"Premium": "Basic"}</div>
  </div>
  <div className="setting__content">
    <div className="settings__sub--title">Email</div>
    <div className="settings__text">{user.email}</div>
  </div>
</>
  : 
  <>
  <Login setmodal={setmodal}></Login>
    </>
  }
  </div>
  </div>
  </>
    )
}

export default Settings