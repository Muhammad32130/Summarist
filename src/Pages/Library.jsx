import axios from "axios";
import Books from "../Components/Books";
import Login from "../Components/Login";
import Modal from "../Components/Modal";
import Search from "../Components/Search";
import Sidebar from "../Components/Sidebar";
import {useState, useEffect} from 'react'
import Skeleton from "../Components/Skeleton";

function Library({ user,data,guestLogin, signup,Signupuser,Loginuser, setsignup, signout, modal, setmodal }) {

const [savedbooks, setbooks] = useState([]);
const [finsihedBooks, setfinished] = useState([]);
const [loading, setloading] = useState(false);

async function getBooks(data) {


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

const SkeletonBooks = Array.from({ length: 5 }, (_, index) => (
  <div className="skelbook" >
    <Skeleton width={172} marginbottom={5} height={190} />
    <Skeleton width={150} marginbottom={5} margintop={5} height={25} />
    <Skeleton width={100} marginbottom={5} height={18} />
    <Skeleton width={172} height={40} marginbottom={5} />
    <Skeleton width={91} height={17} />
  </div>
));



useState(()=>{
  setTimeout(() => {
    
    setloading(true);

  }, 500);


},[])



  
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
            {loading ? 
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
          :
          <>
          <div className="for-you__recommended--books libraryskel">
     {SkeletonBooks}
     {SkeletonBooks}
     

      </div>
          </>  
          }
          </div>
        </>
      ) : (
        <Login setmodal={setmodal}></Login>
      )}
    </>
  );
}

export default Library;
