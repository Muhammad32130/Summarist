import './App.css';
import Home from './Pages/Home.jsx';
import {useState, useEffect} from  'react';
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Page from './Pages/Page';
import {  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from './Firebase';
import { User } from 'firebase/auth';
import { DocumentData, doc, getDoc, setDoc } from 'firebase/firestore';

function App() {
  const [User, setuser] = useState<User | null>(null)
  const [data , setdata] = useState<DocumentData | null>(null)
  const [modal, setmodal] = useState(false)
  const [signup, setsignup] = useState(false)
function Signupuser(e:any){
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    createUserWithEmailAndPassword(auth,email, password).then((user:any) => {
        setuser(user.user)
        setTimeout(() => {
          setmodal(false)
        }, 500);
          setDoc(doc(db, 'users', user.user.uid),{
            Substat : "Basic"
          }).then(()=>{
          })
      })
    }
    useEffect(()=>{
      getsubstat()
    },[User])
    async function getsubstat(){
      if(User){
        const docRef = doc(db, "users", User.uid);
        const docSnap =  await getDoc(docRef)
        if (docSnap.exists()) {
          setdata(docSnap.data())
        }
      }
    }

    function guestLogin(){
      signInWithEmailAndPassword(auth,'guest@gmail.com', 'guest123').then((user:any) => {
        setuser(user.user)
        setTimeout(() => {
          setmodal(false)
        }, 500);
      })
      }
      
     function Loginuser(e:any){
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        signInWithEmailAndPassword(auth,email, password).then((user:any) => {
        setuser(user.user)
        setTimeout(() => {
          setmodal(false)
        }, 500);
     
      })

    }
    function signout(){
      signOut(auth)
      setuser(null)
    }

    useEffect(()=>{
    
      onAuthStateChanged(auth, (data) => {
        if (data !== null) {
          setuser(data);
        }
      })
      
    },[])

    
    
    return (
    <div className="App">
      <BrowserRouter>
      <Routes>

<Route path='/' element={<Home signup={signup} setsignup={setsignup} user={User} guestLogin={guestLogin} Signupuser={Signupuser} Loginuser={Loginuser} modal={modal}  setmodal={setmodal}></Home>}></Route>


<Route path='/:page' element={<Page data={data} signup={signup} setsignup={setsignup} user={User} guestLogin={guestLogin} Signupuser={Signupuser} Loginuser={Loginuser} modal={modal} setmodal={setmodal} signout={signout} ></Page>}></Route>
    


      
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
