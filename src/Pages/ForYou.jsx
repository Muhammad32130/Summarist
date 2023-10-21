import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import Books from '../Components/Books'

function ForYou({user, audioRef, selected ,setselected,calculateAudio,setsuggested, Suggested }) {
const [recommended, setrecommended] = useState(null)

console.log('for-you')

  function getselected(){

    axios.get('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected').then((res)=>{
      setselected(res.data[0])
    })
  }
  function getrecommended(){
    axios.get('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended').then((res)=>{
setrecommended(res.data.slice(0, 5))
    })
  }
  function getSuggested(){
    axios.get('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested').then((res)=>{
setsuggested(res.data.slice(0, 5))
    })
  }
  
  const [audiotime, setaudiotime] = useState([]);
  const timeDisplay = document.querySelectorAll('.recommended')
  const suggestedTime = document.querySelectorAll('.suggested')

  const formatTime = (time, index) => {
    if ( time !== undefined && audiotime.length !== 10) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      setaudiotime((prevAudiotime) => [
        ...prevAudiotime,
        `${formatMinutes}:${formatSeconds}`
      ])
    }
    
    
  };
  useEffect(()=>{
    for (let i = 0; i <timeDisplay.length; i++) {
        timeDisplay[i].innerHTML = audiotime[i]
    }
    for (let i = 0; i <suggestedTime.length; i++) {
        suggestedTime[i].innerHTML = audiotime[i+5]
    }
  },[timeDisplay])


  function calculateAudio(){  
    let audioTime = null
      const time = audioRef?.current?.duration
      const minutes = Math.floor(time / 60);
      const remainingSeconds = Math.floor(time % 60);
      if (minutes === 0 && selected) {
        audioTime = `${remainingSeconds} secs`
      } else if (remainingSeconds === 0) {
       audioTime = `${minutes} mins`
      } else if(selected) {
        audioTime = `${minutes} mins ${remainingSeconds} secs`
      }
     const newobj = {...selected, audioTime: audioTime}
      setselected(newobj)
  }
  
  useEffect(()=>{
    getselected()
    getSuggested()
    getrecommended()
  },[])

  return (
    <div className='for-you__wrapper'>
      <div className='for-you__title'>
      Selected just for you
      </div>
      <a href="" className="selected__book">
        <div className="selected__book--sub-title">
          {selected?.subTitle}
        </div>
        <div className="selected__book--line"></div>
        <div className="selected__book--content">
          <figure className="book__image--wrapper">
            <img src={selected?.imageLink} alt="" className="book__image" />
          </figure>
          <div className="selected__book--text">
            <div className="selected__book--title">{selected?.title}</div>
            <div className="selected__book--author">{selected?.author}</div>
            <div className="selected__book--duration-wrapper">
              <div className="selected__book--icon"><AiFillPlayCircle className='selected__book--icon svg'></AiFillPlayCircle></div>
              <div className="selected__book--duration">{selected?.audioTime}</div>
            </div>
          </div>
        </div>
        <audio onLoadedMetadata={()=>{calculateAudio()}} ref={audioRef} src={selected?.audioLink}></audio>
      </a>
      <div>
      <div className='for-you__title'>Recommended For You</div>
    <div className="for-you__sub--title">We think you'll like these</div>
    <Books formatTime={formatTime}  type={'recommended'} setrecommended={setrecommended} recommended={recommended}></Books>
      </div>
      <div>
      <div className='for-you__title'>Suggested Books</div>
    <div className="for-you__sub--title">Browse those books</div>
      <Books formatTime={formatTime} type={'suggested'} setrecommended={setsuggested} recommended={Suggested}></Books>
      </div>
    </div>
  )
}

export default ForYou