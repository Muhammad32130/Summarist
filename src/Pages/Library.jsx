import axios from "axios";
import Books from "../Components/Books";
import Login from "../Components/Login";
import Modal from "../Components/Modal";
import Search from "../Components/Search";
import Sidebar from "../Components/Sidebar";
import {useState, useEffect} from 'react'

function Library({ user,data,guestLogin, signup,Signupuser,Loginuser, setsignup, signout, modal, setmodal }) {

const [savedbooks, setbooks] = useState([]);
const [finsihedBooks, setfinished] = useState([]);

console.log(data)
async function getBooks(data, setsave) {


  const bookPromises = data.map((element) =>
    axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${element}`)
  );

  try {
    const responses = await Promise.all(bookPromises);
    const bookData = responses.map((res) => res.data);
    return bookData;
  } catch (error) {
    // Handle errors here
    return [];
  }
}
console.log(user)

async function fetchData() {
  if (data.SavedBooks && savedbooks.length !== data?.SavedBooks.length) {
    const savedBooksData = await getBooks(data?.SavedBooks, setbooks);
    setbooks([...savedbooks, ...savedBooksData]);
  }

  if (data.FinsihedBooks && finsihedBooks.length !== data?.FinsihedBooks.length) {
    const finishedBooksData = await getBooks(data?.FinsihedBooks, setfinished);
    setfinished([...finsihedBooks, ...finishedBooksData]);
  }
}
if(data){

  fetchData();
  
}
  
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
              <div className="for-you__sub--title">{savedbooks.length} items</div>
            {data?.SavedBooks.length < 1 ||data?.SavedBooks?.length === undefined ?
              <div className="finished__books--block-wrapper">
                <div className="finished__books--title">
                  Save your favorite books!
                </div>
                <div className="finished__sub--books--title">
                  When you save a book, it will appear here.
                </div>
              </div>
              : 
              <Books recommended={savedbooks}></Books>
                }
              <div className="for-you__title">Finished</div>
              <div className="for-you__sub--title">{finsihedBooks.length} items</div>
             {data?.FinsihedBooks?.length < 1 ||data?.FinsihedBooks?.length === undefined  ?
              <div className="finished__books--block-wrapper">
                <div className="finished__books--title">
                  Save your favorite books!
                </div>
                <div className="finished__sub--books--title">
                  When you save a book, it will appear here.
                </div>
              </div>
            :
            <Books recommended={finsihedBooks}></Books>  
            }
           
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
