import { AiOutlineStar } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState, useEffect} from 'react'
import Skeleton from "./Skeleton";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



function Books({ recommended, setrecommended }) {
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
if(seconds){

  return `${formattedMinutes}:${formattedSeconds}`;
}
 }

 const SkeletonBooks = Array.from({ length: 5 }, (_, index) => (
  <div >
    <Skeleton width={172} marginbottom={5} height={190} />
    <Skeleton width={150} marginbottom={5} margintop={5} height={25} />
    <Skeleton width={100} marginbottom={5} height={18} />
    <Skeleton width={172} height={40} marginbottom={5} />
    <Skeleton width={91} height={17} />
  </div>
));

const settings = {
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow:5,
  slidesToScroll:5,
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 405,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}




  
  return (
        <div className="for-you__recommended--books">

{recommended ? 
  <Slider

   {...settings}
      >


      {recommended?.map((book, index) => {
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
        })
      
      
    }
    </Slider>
  : 
  <div className="recommended-skel">
{SkeletonBooks}

</div>  
  }
    </div>
  );
}

export default Books;
