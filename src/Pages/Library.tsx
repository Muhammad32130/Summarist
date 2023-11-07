import axios from "axios";
import Books from "../Components/Books";
import Login from "../Components/Login";
import Modal from "../Components/Modal";
import Search from "../Components/Search";
import Sidebar from "../Components/Sidebar";
import {useState, useEffect} from 'react'
import Skeleton from "../Components/Skeleton";

type LibraryProps = {
  sidebar: boolean,
  setsidebar: any,
  user: any; // Replace 'any' with the actual type of 'user'
  data: any; // Replace 'any' with the actual type of 'data'
  guestLogin: any; // Replace 'any' with the actual type of 'guestLogin'
  signup: any; // Replace 'any' with the actual type of 'signup'
  Signupuser: any; // Replace 'any' with the actual type of 'Signupuser'
  Loginuser: any; // Replace 'any' with the actual type of 'Loginuser'
  setsignup: any; // Replace 'any' with the actual type of 'setsignup'
  signout: any; // Replace 'any' with the actual type of 'signout'
  modal: any; // Replace 'any' with the actual type of 'modal'
  setmodal: any; // Replace 'any' with the actual type of 'setmodal'
};

const Library: React.FC<LibraryProps> = ({
  sidebar,
  setsidebar,
  user,
  data,
  guestLogin,
  signup,
  Signupuser,
  Loginuser,
  setsignup,
  signout,
  modal,
  setmodal,
}: LibraryProps) => {
  const [savedbooks, setbooks] = useState<any[]>([]); // Define the type for savedbooks
  const [finsihedBooks, setfinished] = useState<any[]>([]); // Define the type for finishedBooks
  const [loading, setloading] = useState(false);

  async function getBooks(data: any) {
    const bookPromises = data.map((element: any) =>
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
      const savedBooksData = await getBooks(data?.SavedBooks);
      setbooks([...savedbooks, ...savedBooksData]);

    }

    if (data.FinsihedBooks && finsihedBooks.length !== data?.FinsihedBooks.length) {
      const finishedBooksData = await getBooks(data?.FinsihedBooks);
      setfinished([...finsihedBooks, ...finishedBooksData]);
    }
    setloading(true);
  }

  useEffect(() => {
    if (data) {
      fetchData();
     
    }
  
  }, [data, user]);

  const SkeletonBooks = Array.from({ length: 5 }, (_, index) => (
    <div className="skelbook" key={index}>
      <Skeleton width={172} marginbottom={5} margintop={0} height={190} />
      <Skeleton width={150} marginbottom={5} margintop={5} height={25} />
      <Skeleton margintop={0} width={100} marginbottom={5} height={18} />
      <Skeleton margintop={0} width={172} height={40} marginbottom={5} />
      <Skeleton width={91} marginbottom={0} margintop={0} height={17} />
    </div>
  ));

  
  return (
    <>
       <Sidebar sidebar={sidebar} setsidebar={setsidebar}
      textsize={null}
      setsize={null}
      id={null}
        setmodal={setmodal}
        modal={modal}
        user={user}
        signout={signout}
      ></Sidebar>
       <Search sidebar={sidebar} setsidebar={setsidebar}></Search>
      {modal && (
        <Modal
          user={user}
          guestLogin={guestLogin}
          signup={signup}
          Signupuser={Signupuser}
          Loginuser={Loginuser}
          setmodal={setmodal}
          setsignup={setsignup}
        ></Modal>
      )}
      {user && loading ? (
        <div className="wrapper">
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
        </div>
      ) : (loading ?
        <Login setmodal={setmodal}></Login>
        :
        <div className="row">
        <div className="for-you__recommended--books libraryskel">
     {SkeletonBooks}
     {SkeletonBooks}
      </div>
        </div>
      )}
    </>
  );
}

export default Library;
