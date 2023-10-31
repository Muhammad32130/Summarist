import { AiOutlineStar } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import {useEffect, useState, useRef} from 'react'



function Books({ recommended, type ,setrecommended }) {
  const [audioDurations, setAudioDurations] = useState({});

 function audiotime(time, id){

  setAudioDurations((prevAudioDurations) => ({
    ...prevAudioDurations,
    [id]: time,
  }));

 }

 function formatDuration(seconds){
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Use the padStart() method to add leading zeros for single-digit values
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
 }






  
  return (
    <div className="for-you__recommended--books">
      {recommended &&
        recommended?.map((book, index) => {
          const duration = audioDurations[book.id]
       
          return (
            <Link href="" to={`/book/${book.id}`} key={index} className="for-you__recommended--books-link">
              {book.subscriptionRequired &&
                
                <div className="book__pill book__pill--subscription-required">Premium</div>
                
              }
              
<audio onLoadedMetadata={(e)=>{audiotime(e.target.duration, book.id)}} src={book.audioLink}></audio> 
              <figure style={{ width: "172px", height: "172px", marginBottom:"8px"}} className="book__image--wrapper">
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
                      <div className='recommended__book--details-text'>
{formatDuration(duration)}
                      </div>
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
            </Link>
          );
        })}
    </div>
  );
}

export default Books;
