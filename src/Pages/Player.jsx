import React from "react";
import Sidebar from "../Components/Sidebar";
import Search from "../Components/Search";
import { BsPlayFill } from "react-icons/bs";
import { useParams } from "react-router";
import axios from "axios";
import { useCallback } from "react";
import { useEffect, useState, useRef } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import {IoIosPause} from 'react-icons/io'

function Player({setmodal,finished, setfinished, user, signout}) {
  const playeraudio = useRef();
  const progressRef = useRef();
  const [textsize, setsize] = useState('22');
  const [play, setplay] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [book, setbook] = useState();
  const { id } = useParams();
console.log(user)

  function getbook() {
    axios
      .get(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
      .then((res) => {
        setbook(res.data);
      });
  }
  const formatTime = () => {
    if (playeraudio?.current) {
      const minutes = Math.floor(playeraudio.current.duration / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(playeraudio.current.duration % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      if (isNaN(formatMinutes)) {
        return "00:00";
      } else {
        return `${formatMinutes}:${formatSeconds}`;
      }
    }
  };
 
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (playeraudio.current) {
        const minutes = Math.floor(playeraudio?.current?.currentTime / 60);
        const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(playeraudio?.current?.currentTime % 60);
        const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        setCurrentTime(`${formatMinutes}:${formatSeconds}`);
      }
  
      if(playeraudio?.current?.ended){
        setplay(false)
      }
    }, 0);
  

    return () => {
      clearInterval(intervalId);
    };
  }, [play]);

  useEffect(() => {
    getbook();
  }, []);

  function toggleaudio() {
    if (play) {
      playeraudio.current.pause();
      setplay(false);
    } else {
      playeraudio.current.play();
      setplay(true);
    }
  }

  function skiptime() {
    playeraudio.current.currentTime = playeraudio.current.currentTime + 10;
  }
  function rewindtime() {
    playeraudio.current.currentTime = playeraudio.current.currentTime - 10;
  }
  function handleTimeChange(e) {
    playeraudio.current.currentTime = progressRef.current.value;
  }
 function finsihedBook(){
  if(user && book){
    const docref = doc(db, "users", user?.uid)
    
    updateDoc(docref,{
      FinsihedBooks:arrayUnion(book.id)
    })
    console.log("added")
  }
}
 
useEffect(()=>{
  finsihedBook()
},[playeraudio?.current?.ended=== true])
  
 

 

  return (
    <div className="wrapper">
      <Sidebar setmodal={setmodal} user={user} signout={signout} textsize={textsize} setsize={setsize} id={id}></Sidebar>
      <Search></Search>
      <div className="summary">
        <audio ref={playeraudio} src={book?.audioLink}></audio>
        <div className="audio__book--summary">
          <div className="audio__book--summary-title">{book?.title}</div>
          <div style={{fontSize:`${textsize}px`}} className="audio__book--summary-text">{book?.summary}</div>
        </div>
        <div className="audio__wrapper">
          <div className="audio__track--wrapper">
            <figure className="audio__track--image-mask">
              <figure className="book__image--wrapper">
                <img src={book?.imageLink} alt="" className="book__image" />
              </figure>
            </figure>
            <div className="audio__track--details-wrapper">
              <div className="audio__track--title">{book?.title}</div>
              <div className="audio__track--author">{book?.author}</div>
            </div>
          </div>
          <div className="audio__controls--wrapper">
            <div className="audio__controls">
              <button
                onClick={() => {
                  rewindtime();
                }}
                className="audio__controls--btn"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                    d="M3.11111111,7.55555556 C4.66955145,4.26701301 8.0700311,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 L12,22 C6.4771525,22 2,17.5228475 2,12 M2,4 L2,8 L6,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"
                  ></path>
                </svg>
              </button>
              <button
                onClick={() => {
                  toggleaudio();
                }}
                className="audio__controls--btn audio__controls--btn-play"
              >
                {play? <IoIosPause></IoIosPause>:<BsPlayFill></BsPlayFill>}
              </button>
              <button
                onClick={() => {
                  skiptime();
                }}
                className="audio__controls--btn"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                    d="M20.8888889,7.55555556 C19.3304485,4.26701301 15.9299689,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 L12,22 C17.5228475,22 22,17.5228475 22,12 M22,4 L22,8 L18,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="audio__progress--wrapper">
            <div className="audio__time">{currentTime}</div>
            <input
              ref={progressRef}
              type="range"
              min="0:00"
              max={playeraudio?.current?.duration}
              value={playeraudio?.current?.currentTime}
              style={{
                background: `linear-gradient(to right, rgb(43, 217, 124) 
                ${
                  playeraudio.current
                    ? `${
                        (playeraudio.current.currentTime /
                          playeraudio.current.duration) *
                        100
                      }%`
                    : "0%"
                },
                 rgb(109, 120, 125) ${
                   playeraudio.current
                     ? `${
                         (playeraudio.current.currentTime /
                           playeraudio.current.duration) *
                         100
                       }%`
                     : "0%"
                 }) `,
              }}
              onChange={(e) => handleTimeChange(e)}
              className="audio__progress--bar"
            />
            <div className="audio__time">{formatTime()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
