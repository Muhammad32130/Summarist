
import Sidebar from '../Components/Sidebar'
import Search from '../Components/Search'
import ForYou from './Foryou'
import Library from './Library'
import { useLocation } from 'react-router'
import Settings from './Settings'
import Modal from '../Components/Modal'


function Page({modal,data, signup, setsignup, setmodal, guestLogin, signout ,Signupuser, Loginuser, user}) {
const location = useLocation()
  
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

{location.pathname ==='/for-you' && <ForYou user={user}></ForYou>}
{location.pathname ==='/Library' && <Library user={user} setmodal={setmodal}></Library>}
{location.pathname ==='/settings' && <Settings data={data} user={user} setmodal={setmodal}></Settings>}

    </div>
      </div>

      </div>
    </div>
  )
}

export default Page