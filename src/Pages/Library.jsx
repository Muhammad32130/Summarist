import Login from '../Components/Login'

function Library({user, setmodal}) {
  return (
    <>
    {user ?
      <div>
        settings
      </div>
      : <Login setmodal={setmodal}></Login>
    }
    </>
  )
}

export default Library