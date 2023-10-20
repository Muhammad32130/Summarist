import Login from '../Components/Login'

function Settings({user,data, setmodal}) {
  return (
    <>
<div className="section__title page__title">Settings</div>
   {user ?
<>
  <div className="setting__content">
    <div className="settings__sub--title">Your Subscription plan</div>
    <div className="settings__text">{data?.Substat}</div>
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
    </>
    )
}

export default Settings