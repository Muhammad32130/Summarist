import "./App.css";
import Home from "./Pages/Home";
import { useState, useEffect, useRef } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Page from "./Pages/Page";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app, auth, db } from "./Firebase";
import { User } from "firebase/auth";
import { DocumentData, doc, onSnapshot, setDoc } from "firebase/firestore";
import Book from "./Components/Book";
import Library from "./Pages/Library";
import Settings from "./Pages/Settings";
import Player from "./Pages/Player";
import ChoosePlan from "./Pages/ChoosePlan";
import { getPremiumStatus } from "./substat";
import { error } from "console";

function App() {
  const [User, setuser] = useState<User | null>(null);
  const [sidebar, setsidebar] = useState<boolean>(false)
  const [data, setdata] = useState<DocumentData | null>(null);
  const [modal, setmodal] = useState<boolean>(false);
  const [signup, setsignup] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [savebook, setsavebook] = useState(false);
  const [finsihed, setfinished] = useState([])
  const [premium, setpremium] = useState(false);
  const [err, seterr] = useState(null);


  if (User && window.location.pathname === "/") {
    window.location.pathname = "/for-you";
  }
  
  useEffect(() => {
    const getPremium = async () => {
      const premiumStat = auth.currentUser
      ? await getPremiumStatus(app)
      : false;
      setpremium(premiumStat);
    };
    getPremium();
  }, [app, auth.currentUser?.uid]);
  
  
  function Signupuser(e: any) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    createUserWithEmailAndPassword(auth, email, password).then((user: any) => {
      setuser(user.user);
      setTimeout(() => {
        setmodal(false);
      }, 500)
      setDoc(doc(db, "users", user.user.uid), {
        SavedBooks: [],
      }).then(() => {});
    }).catch(err=>{
      seterr(err.message)
    })
  }

  async function getsubstat() {
      if (User) {
          const docRef = doc(db, "users", User.uid);
          const docSnap =  onSnapshot(docRef,(docSnap)=>{
        
              if (docSnap.exists()) {
                  setdata(docSnap.data());
                }
              });
              return docSnap
              }
            }
          useEffect(() => {
              getsubstat();
            }, [User]);
            function guestLogin() {
              signInWithEmailAndPassword(auth, "guest@gmail.com", "guest123").then(
                (user: any) => {
                  setuser(user.user);
                  setTimeout(() => {
                    setmodal(false);
                  }, 500);
                }
                );
              }
              
              function Loginuser(e: any) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signInWithEmailAndPassword(auth, email, password).then((user: any) => {
      setuser(user.user);
      setTimeout(() => {
        setmodal(false);
      }, 500);
    }).catch(err=>{
      seterr(err.message)
    })
  }
  function signout() {
    signOut(auth);
    setuser(null);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data !== null) {
        setuser(data);
      }
    });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
              err={err}
                signup={signup}
                setsignup={setsignup}
                user={User}
                guestLogin={guestLogin}
                Signupuser={Signupuser}
                Loginuser={Loginuser}
                modal={modal}
                setmodal={setmodal}
              ></Home>
            }
          ></Route>

          <Route
            path="/for-you"
            element={
              <Page
              sidebar={sidebar}
              setsidebar={setsidebar}
                audioRef={audioRef}
                err={err}
                signup={signup}
                setsignup={setsignup}
                user={User}
                guestLogin={guestLogin}
                Signupuser={Signupuser}
                Loginuser={Loginuser}
                modal={modal}
                setmodal={setmodal}
                signout={signout}
              ></Page>
            }
          ></Route>
          <Route
            path="/Library"
            element={
              <Library
              err={err}
              sidebar={sidebar}
              setsidebar={setsidebar}
                data={data}
                signout={signout}
                signup={signup}
                setsignup={setsignup}
                user={User}
                guestLogin={guestLogin}
                Signupuser={Signupuser}
                Loginuser={Loginuser}
                modal={modal}
                setmodal={setmodal}
              ></Library>
            }
          ></Route>
          <Route
            path="/Settings"
            element={
              <Settings
              err={err}
              sidebar={sidebar}
              setsidebar={setsidebar}
                premium={premium}
                signout={signout}
                signup={signup}
                setsignup={setsignup}
                user={User}
                guestLogin={guestLogin}
                Signupuser={Signupuser}
                Loginuser={Loginuser}
                modal={modal}
                setmodal={setmodal}
              ></Settings>
            }
          ></Route>
          <Route
            path="/book/:id"
            element={
              <Book
              sidebar={sidebar}
              setsidebar={setsidebar}
                modal={modal}
                guestLogin={guestLogin}
                Signupuser={Signupuser}
                Loginuser={Loginuser}
                signup={signup}
                setmodal={setmodal}
                setsignup={setsignup}
                data={data}
                premium={premium}
                setsavebook={setsavebook}
                savebook={savebook}
                user={User}
                signout={signout}
              ></Book>
            }
          ></Route>
          <Route
            path="/choose-plan"
            element={<ChoosePlan user={User}></ChoosePlan>}
          ></Route>
          <Route
            path="/player/:id"
            element={
              <Player
              sidebar={sidebar}
              setsidebar={setsidebar}
              finished = {finsihed}
              setfinished={setfinished}
                setmodal={setmodal}
                user={User}
                signout={signout}
              ></Player>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
