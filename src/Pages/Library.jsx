import Login from '../Components/Login'
import Search from '../Components/Search'
import Sidebar from '../Components/Sidebar'

function Library({user,signout, setmodal}) {
  return (
    <>
    {user ?
        (<>
  
        <Sidebar setmodal={setmodal} user={user} signout={signout} ></Sidebar>
        <Search></Search>
        <div className="row">
      <div className="container">
      <div className="for-you__title">Saved Books</div>
      <div className="for-you__sub--title">0 items</div>
      <div className="finished__books--block-wrapper">
      <div className="finished__books--title">Save your favorite books!</div>
      <div className="finished__sub--books--title">When you save a book, it will appear here.</div>
      </div>
      <div className="for-you__title">Finished</div>
      <div className="for-you__sub--title">0 items</div>
      <div className="finished__books--block-wrapper">
      <div className="finished__books--title">Save your favorite books!</div>
      <div className="finished__sub--books--title">When you save a book, it will appear here.</div>
      </div>
      </div>
      </div>

        </>)




      : (<Login setmodal={setmodal}></Login>)
    }
    </>
  )
}

export default Library