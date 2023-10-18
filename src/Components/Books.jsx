import React, { useRef, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { useEffect } from "react";
import { RiContactsBookLine } from "react-icons/ri";

function Books({ recommended, setrecommended }) {
  const [audiotime, setaudiotime] = useState({});
  const timeDisplay = document.querySelectorAll('.time')


  const formatTime = (time, index) => {
    if (time !== undefined && audiotime.length !== 5) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      setaudiotime((prevaudiotime) => ({
        ...prevaudiotime,
        [index]: `${formatMinutes}:${formatSeconds}`,
      }))
    }
    
  };
  useEffect(()=>{
    for (let i = 0; i <timeDisplay.length; i++) {
        timeDisplay[i].innerHTML = audiotime[i]
    }
  },[timeDisplay])








  return (
    <div className="for-you__recommended--books">
      {recommended &&
        recommended?.map((book, index) => {
          return (
            <a href="" key={index} className="for-you__recommended--books-link">
              <audio
                onLoadedMetadata={(e) => {
                  formatTime(e.target.duration, index);
                }}
                src={book.audioLink}
              ></audio> 
              <figure className="book__image--wrapper">
                <img src={book.imageLink} alt="" className="book__image" />
              </figure>
              <div className="recommended__book--title">{book.title}</div>
              <div className="recommended__book--author">{book.author}</div>
              <div className="recommended__book--sub-title">
                {book.subTitle}
              </div>
              <div className="recommended__book--details-wrapper">
                <div className="recommended__book--details">
                  <div className="recommended__book--details-icon">
                    <BiTimeFive></BiTimeFive>
                  </div> 


                      <div className="recommended__book--details-text time"></div>

                      
                </div>
                <div className="recommended__book--details">
                  <div className="recommended__book--details-icon">
                    <AiOutlineStar></AiOutlineStar>
                  </div>
                  <div className="recommended__book--details-text">
                    {book.averageRating}
                  </div>
                </div>
              </div>
            </a>
          );
        })}
    </div>
  );
}

export default Books;
