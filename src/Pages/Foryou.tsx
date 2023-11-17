import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import Books from '../Components/Books'
import { Link } from 'react-router-dom'
import Skeleton from '../Components/Skeleton'
import { Carousel } from "react-responsive-carousel";


type ForYouProps = {
  
  audioRef: React.RefObject<HTMLAudioElement>;
  user: any; 

};

function ForYou({ user, audioRef,  }: ForYouProps) {
  const [recommended, setrecommended] = useState<any>(null);
  const [Suggested, setsuggested] = useState<any>(null);
  const [selected, setselected] = useState<any>(null);
  useEffect(() => {
      getrecommended();
      getSuggested();
  }, []);
  

  function getselected() {
    axios.get('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected').then((res) => {
        setTimeout(() => {
          
          setselected(res.data[0]);
        }, 500);
    });
  }

  function getrecommended() {
    axios.get('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended').then((res) => {
        setTimeout(() => {
          
          setrecommended(res.data);
        }, 500);
    });
  }

  function getSuggested() {
    axios.get('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested').then((res) => {
      setTimeout(() => {
        
        setsuggested(res.data);
      }, 500);
    });
  }


  





console.log(Suggested)
  function calculateAudio() {
    const duration = document.querySelectorAll('.selected__book--duration');
    let audioTime = "";
    const time = audioRef?.current?.duration || 0;
    const minutes = Math.floor(time / 60);
    const remainingSeconds = Math.floor(time % 60);
    if (minutes === 0 && selected) {
      audioTime = `${remainingSeconds} secs`;
    } else if (remainingSeconds === 0) {
      audioTime = `${minutes} mins`;
    } else if (selected) {
      audioTime = `${minutes} mins ${remainingSeconds} secs`;
    }

    if (duration.length > 0) {
      duration[0].innerHTML = audioTime;
    }
  }
 
  
  useEffect(()=>{
      
      getselected()
      getSuggested()
      getrecommended()
  },[window.location.pathname])

  return (
    <div className='for-you__wrapper'>
      <div className='for-you__title'>
      Selected just for you
      </div>
      {selected ? <Link to={`/book/${selected?.id}`} className="selected__book">
        <div className="selected__book--sub-title">
          {selected?.subTitle}
        </div>
        <div className="selected__book--line"></div>
        <div className="selected__book--content">
          <figure style={{height: "140px", width: "140px", minWidth: "140px"}} className="book__image--wrapper">
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
      </Link>
    :
    <Skeleton width={657} margintop={0} height={164} marginbottom={24}></Skeleton>  
    }
      <div>
      <div className='for-you__title'>Recommended For You</div>
    <div className="for-you__sub--title">We think you'll like these</div>

    <Books setrecommended={setrecommended} recommended={recommended}  ></Books>
      </div>
      <div>
      <div className='for-you__title'>Suggested Books</div>
    <div className="for-you__sub--title">Browse those books</div>
      <Books  setrecommended={setsuggested} recommended={Suggested} ></Books>
      </div>
    </div>
  )
}

export default ForYou