import Login from "../Components/Login";
import Modal from "../Components/Modal";
import Search from "../Components/Search";
import Sidebar from "../Components/Sidebar";

function Library({ user,guestLogin, signup,Signupuser,Loginuser, setsignup, signout, modal, setmodal }) {
  console.log(modal);
  return (
    <>
      <Sidebar
        setmodal={setmodal}
        modal={modal}
        user={user}
        signout={signout}
      ></Sidebar>
      <Search></Search>
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
      {user ? (
        <>
          <div className="row">
            <div className="container">
              <div className="for-you__title">Saved Books</div>
              <div className="for-you__sub--title">0 items</div>
              <div className="finished__books--block-wrapper">
                <div className="finished__books--title">
                  Save your favorite books!
                </div>
                <div className="finished__sub--books--title">
                  When you save a book, it will appear here.
                </div>
              </div>
              <div className="for-you__title">Finished</div>
              <div className="for-you__sub--title">0 items</div>
              <div className="finished__books--block-wrapper">
                <div className="finished__books--title">
                  Save your favorite books!
                </div>
                <div className="finished__sub--books--title">
                  When you save a book, it will appear here.
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Login setmodal={setmodal}></Login>
      )}
    </>
  );
}

export default Library;
