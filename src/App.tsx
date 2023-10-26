import "./App.css";
import Home from "./Pages/Home.jsx";
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
import { DocumentData, doc, getDoc, setDoc } from "firebase/firestore";
import Book from "./Components/Book";
import Library from "./Pages/Library";
import Settings from "./Pages/Settings";
import Player from "./Pages/Player";
import Modal from "./Components/Modal";
import ChoosePlan from "./Pages/ChoosePlan";
import { getPremiumStatus } from "./substat";

function App() {
  const [User, setuser] = useState<User | null>(null);
  const [data, setdata] = useState<DocumentData | null>(null);
  const [modal, setmodal] = useState<boolean>(false);
  const [signup, setsignup] = useState<boolean>(false);
  const [Suggested, setsuggested] = useState(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [savebook, setsavebook] = useState(false);
  const [selected, setselected] = useState<any>(null);
  const [premium, setpremium] = useState(false);

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
      }, 500);
      setDoc(doc(db, "users", user.user.uid), {
        Substat: "Basic",
        SavedBooks: [],
      }).then(() => {});
    });
  }
  function calculateAudio() {
    let audioTime = null;
    const time = audioRef?.current?.duration;
    if (time) {
      const minutes = Math.floor(time / 60);
      const remainingSeconds = Math.floor(time % 60);
      if (minutes === 0 && selected) {
        audioTime = `${remainingSeconds} secs`;
      } else if (remainingSeconds === 0) {
        audioTime = `${minutes} mins`;
      } else if (selected) {
        audioTime = `${minutes} mins ${remainingSeconds} secs`;
      }
      const newobj = { ...selected, audioTime: audioTime };
      setselected(newobj);
    }
  }

  useEffect(() => {
    getsubstat();
  }, [User, savebook]);
  async function getsubstat() {
    if (User) {
      const docRef = doc(db, "users", User.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setdata(docSnap.data());
      }
    }
  }

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
    });
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
                audioRef={audioRef}
                selected={selected}
                setselected={setselected}
                calculateAudio={calculateAudio}
                setsuggested={setsuggested}
                Suggested={Suggested}
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
