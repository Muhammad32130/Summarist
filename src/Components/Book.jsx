import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import Sidebar from "./Sidebar";
import Search from "./Search";
import axios from "axios";
import { AiOutlineStar } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { BsFillBookmarkFill, BsMic } from "react-icons/bs";
import {TbBulb} from 'react-icons/tb'
import {PiBookOpenTextBold} from 'react-icons/pi'
import {BsBookmark} from 'react-icons/bs'
import { Link } from "react-router-dom";
import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import Modal from "./Modal";

function Book({ modal,data, savebook, setsavebook, setmodal , signout,guestLogin,user, Signupuser,Loginuser, signup , setsignup }) {
  const { id } = useParams();
  const [audiotime, setaudiotime] = useState(null);
  const [booksave, setbooksave] = useState(false);
  const audioRef = useRef()
    const [book, setbook] =useState(null)


    function calculateAudio() {
        let audioTime = null;
        const time = audioRef?.current?.duration;
        if (time) {
          const minutes = Math.floor(time / 60);
          const remainingSeconds = Math.floor(time % 60);
          if (minutes === 0 && book) {
            audioTime = `${remainingSeconds} secs`;
          } else if (remainingSeconds === 0) {
            audioTime = `${minutes} mins`;
          } else if (book) {
            audioTime = `${minutes} mins ${remainingSeconds} secs`;
          }
          setaudiotime(`0${minutes}:${remainingSeconds}`);
        }
      }


    function getbook(){
        axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`).then((res)=>{
        setbook(res.data)
        })
    }
useEffect(()=>{
  getbook()
  if(data?.SavedBooks?.includes(id)){
    setbooksave(true)
  }
  else{
    setbooksave(false)
  }
},[])




  async function BookMarkbook(){
    const docref = doc(db, "users", user?.uid)
   
    await updateDoc(docref,{
      SavedBooks:arrayUnion(book.id)
    })
    if(savebook===false){
      await updateDoc(docref,{
        SavedBooks:arrayRemove(book.id)
      })
    }
    setsavebook(!savebook)
    setbooksave(!booksave)
  }
console.log(data)
console.log(book)


  return (
    <div className="wrapper">
      {modal && <Modal guestLogin={guestLogin} user={user} Signupuser={Signupuser} Loginuser={Loginuser} signup={signup} setmodal={setmodal} setsignup={setsignup} ></Modal>}
      <Sidebar setmodal={setmodal} user={user} signout={signout}></Sidebar>
      <Search></Search>
      {book && 
      <div className="row">
        <audio ref={audioRef} onLoadedMetadata={()=>{calculateAudio()}} src={book.audioLink}></audio>
        <div className="container">
          <div className="inner__wrapper">
            <div className="inner__book">
              <div className="inner-book__title">{book.title}</div>
              <div className="inner-book__author">{book.author}</div>
              <div className="inner-book__sub--title">{book.subTitle}</div>
              <div className="inner-book__wrapper">
                <div className="inner-book__description--wrapper">
                  <div className="inner-book__description">
                     <div className="inner-book__icon"><AiOutlineStar></AiOutlineStar></div>
                    <div className="inner-book__overall--rating">{book.averageRating } </div>
                    <div className="inner-book__overall--rating">{` (${ book.totalRating} ratings)`}</div>
                  </div>
                  <div className="inner-book__description">
                    <div className="inner-book__icon"><BiTimeFive></BiTimeFive></div>
                    <div className="inner-book__duration">{audiotime}</div>
                  </div>
                  <div className="inner-book__description">
                    <div className="inner-book__icon"><BsMic></BsMic></div>
                    <div className="inner-book__type">{book.type}</div>
                  </div>
                  <div className="inner-book__description">
                     <div className="inner-book__icon"><TbBulb></TbBulb></div>
                    <div className="inner-book__key--ideas">{book.keyIdeas} Key ideas</div>
                  </div>
                </div>
              </div>
              <div className="inner-book__read--btn-wrapper">
                {user ?<Link to={data?.Substat === 'Basic'&&book?.subscriptionRequired ?(`/choose-plan`):(`/player/${book.id}`)}>
                <button className="inner-book__read--btn">
                  <div className="inner-book__read--icon"><PiBookOpenTextBold></PiBookOpenTextBold></div>
                  <div className="inner-book__read--text">Read</div>
                </button>
                </Link>:
                <button onClick={()=>{setmodal(true)}} className="inner-book__read--btn">
                <div className="inner-book__read--icon"><PiBookOpenTextBold></PiBookOpenTextBold></div>
                <div className="inner-book__read--text">Read</div>
              </button>
                }
                {user ?
                <Link to={`/player/${book.id}`}>
                <button className="inner-book__read--btn">
                  <div className="inner-book__read--icon"><BsMic></BsMic></div>
                  <div className="inner-book__read--text">Listen</div>
                </button>
                </Link>
              : 
              <button onClick={()=>{setmodal(true)}} className="inner-book__read--btn">
                  <div className="inner-book__read--icon"><BsMic></BsMic></div>
                  <div className="inner-book__read--text">Listen</div>
                </button>
              }
              </div>
              <div onClick={()=>{BookMarkbook()}} className="inner-book__bookmark">
                <div className="inner-book__bookmark--icon">{booksave?<BsFillBookmarkFill></BsFillBookmarkFill>:<BsBookmark></BsBookmark>}</div>
                <div className="inner-book__bookmark--text">
                  {booksave?"Saved in My Library":"Add title to My Library"}
                </div>
              </div>
              <div className="inner-book__secondary--title">
                What is it about?
              </div>
              <div className="inner-book__tags--wrapper">
                {book &&
                    book.tags.map((e)=>{
                        return <div className="inner-book__tag">{e}</div>
                    })
                }
              </div>
              <div className="inner-book__book--description">{book.bookDescription}</div>
              <h2 className="inner-book__secondary--title">About the author</h2>
              <div className="inner-book__author--description">{book.authorDescription}</div>
            </div>
            <div className="inner-book--img-wrapper">
              <div className="book__image--wrapper-book">
                <img src={book.imageLink} className="book__image"></img>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default Book;
