import React from 'react';
import Login from '../Components/Login';
import Modal from '../Components/Modal';
import Search from '../Components/Search';
import Sidebar from '../Components/Sidebar';

interface SettingsProps {
  user: any;
  premium: boolean;
  sidebar: boolean;
  setsidebar: (value: boolean) => void;
  guestLogin: Function;
  signup: boolean;
  Signupuser: Function;
  Loginuser: Function;
  setsignup: (value: boolean) => void;
  signout: Function;
  modal: boolean;
  setmodal: (value: boolean) => void;
  err:any;
}

function Settings({
  user,
  premium,
  sidebar,
  setsidebar,
  guestLogin,
  signup,
  Signupuser,
  Loginuser,
  setsignup,
  signout,
  modal,
  setmodal,
  err,
}: SettingsProps) {
  return (
    <>
      <Sidebar
      textsize={null}
      modal={null}
      setsize={null}
      id={null}
        sidebar={sidebar}
        setsidebar={setsidebar}
        setmodal={setmodal}
        user={user}
        signout={signout}
      ></Sidebar>
      <Search sidebar={sidebar} setsidebar={setsidebar}></Search>
      <div className="container">
        <div className="row">
          <div className="section__title page__title">Settings</div>
          {modal && (
            <Modal
            err={err}
            user={user}
              guestLogin={guestLogin}
              signup={signup}
              Signupuser={Signupuser}
              Loginuser={Loginuser}
              setmodal={setmodal}
              setsignup={setsignup}
            ></Modal>
          )}
          {user ? (
            <>
              <div className="setting__content">
                <div className="settings__sub--title">Your Subscription plan</div>
                <div className="settings__text">{premium ? 'Premium' : 'Basic'}</div>
              </div>
              <div className="setting__content">
                <div className="settings__sub--title">Email</div>
                <div className="settings__text">{user.email}</div>
              </div>
            </>
          ) : (
            <>
              <Login setmodal={setmodal}></Login>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Settings;
