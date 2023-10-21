
import Sidebar from '../Components/Sidebar'
import Search from '../Components/Search'
import ForYou from './Foryou'
import Library from './Library'
import { useLocation, useParams } from 'react-router'
import Settings from './Settings'
import Modal from '../Components/Modal'
import Book from '../Components/Book'


function Page({modal,data,audioRef,selected,setselected,calculateAudio,setsuggested,Suggested, signup, setsignup, setmodal, guestLogin, signout ,Signupuser, Loginuser, user}) {
const location = useLocation()
const {id} = useParams()
console.log(id)
  return (
    <div className='foru-main'>
      <div className="wrapper">

      <Sidebar setmodal={setmodal} user={user} signout={signout} ></Sidebar>
      <Search></Search>
      <div className="row">
    <div className="container">
{modal &&
<Modal user={user} guestLogin={guestLogin} signup={signup} Signupuser={Signupuser} Loginuser={Loginuser} setmodal={setmodal} setsignup={setsignup}></Modal>
}

<ForYou audioRef={audioRef} selected={selected} setselected={setselected} calculateAudio={calculateAudio} setsuggested={setsuggested} Suggested={Suggested} user={user}></ForYou>

    </div>
      </div>

      </div>
    </div>
  )
}

export default Page