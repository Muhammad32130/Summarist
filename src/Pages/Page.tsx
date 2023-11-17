import React from 'react';
import Sidebar from '../Components/Sidebar';
import Search from '../Components/Search';
import ForYou from './Foryou';
import Modal from '../Components/Modal';

interface PageProps {
  modal: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  sidebar: boolean;
  setsidebar: (value: boolean) => void;
  signup: boolean;
  setsignup: (value: boolean) => void;
  setmodal: (value: boolean) => void;
  guestLogin: Function;
  signout: Function;
  Signupuser: Function; 
  Loginuser: Function; 
  user: any; 
  err:any;
}

function Page({
  modal,
  audioRef,
  sidebar,
  setsidebar,
  signup,
  setsignup,
  setmodal,
  guestLogin,
  signout,
  Signupuser,
  Loginuser,
  user,
  err
}: PageProps) {


  return (
    <div className="foru-main">
      <div className="wrapper">
        <Sidebar
        textsize={null}
        setsize={null}
        modal={null}
        id={null}
          sidebar={sidebar}
          setsidebar={setsidebar}
          setmodal={setmodal}
          user={user}
          signout={signout}
        ></Sidebar>
        <Search sidebar={sidebar} setsidebar={setsidebar}></Search>
        <div className="row">
          <div className="container">
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
            <ForYou
              audioRef={audioRef}
       
              user={user}
            ></ForYou>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
