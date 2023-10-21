import { AiOutlineStar } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";


function Books({ recommended, type ,setrecommended, formatTime }) {








  return (
    <div className="for-you__recommended--books">
      {recommended &&
        recommended?.map((book, index) => {
          return (
            <Link href="" to={`/book/${book.id}`} key={index} className="for-you__recommended--books-link">
              {book.subscriptionRequired &&
                
                <div className="book__pill book__pill--subscription-required">Premium</div>
            
            }
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
                      <div className={`recommended__book--details-text ${type}`}></div>
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
