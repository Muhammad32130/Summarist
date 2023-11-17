import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiTimeFive } from "react-icons/bi";
import Skeleton from "./Skeleton";

function Search({sidebar, setsidebar}) {
  const [booksearch, setbooksearch] = useState(null);
  const [search, setsearch] = useState(null);
  const [audioDurations, setAudioDurations] = useState({});
  const [loading, setloading] = useState(false);

  function fetchsearch(inp) {
    setsearch(inp);
    if (search?.length > 0) {
      axios
        .get(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
        )
        .then((res) => {
          setbooksearch(res.data);
          setTimeout(() => {
            setloading(true);
          }, 500);
        })
        .catch((err) => {
          setbooksearch(null);
        });
    }
  }
  useEffect(() => {
    if (search?.length < 1) {
      setbooksearch(null); 
      setloading(false);
    }
  });
  useEffect(()=>{
    setloading(false)
  },[search])

  function audiotime(time, id) {
    setAudioDurations((prevAudioDurations) => ({
      ...prevAudioDurations,
      [id]: time,
    }));
  }
  

  function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Use the padStart() method to add leading zeros for single-digit values
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }
console.log(sidebar)
  return (
    <div className="search-bg">
      <div className="search-wrap">
        <div className="search-cont">
          <div className="search-inp">
            <input
              onChange={(e) => {
                fetchsearch(e.target.value);
              }}
              type="text"
              placeholder="Search for books"
              className="search"
            />
          </div>
          <div className="search-ico">
            <AiOutlineSearch className="li-ico m-0"></AiOutlineSearch>
          </div>
         
        </div>
        {booksearch !== null && (
          <div className="search__books--wrapper">
            {booksearch?.length > 0 && loading ? (
              booksearch.map((book) => {
                const duration = audioDurations[book.id];

                return (
                  <Link to={`/book/${book.id}`} className="search__book--link">
                    <audio
                      src={book.audioLink}
                      onLoadedMetadata={(e) => {
                        audiotime(e.target.duration, book.id);
                      }}
                    ></audio>
                    <figure
                      className="book__image--wrapper"
                      style={{
                        height: "80px",
                        width: "80px",
                        minWidth: "80px",
                      }}
                    >
                      <img
                        src={book.imageLink}
                        alt=""
                        className="book__image"
                      />
                    </figure>
                    <div>
                      <div className="search__book--title">{book.title}</div>
                      <div className="search__book--author">{book.author}</div>
                      <div className="search__book--duration">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon">
                            <BiTimeFive></BiTimeFive>
                          </div>
                          <div className="recommended__book--details-text">
                            {formatDuration(duration)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : loading === false ? (
              <>
                <Skeleton width={"100%"} marginbottom={10} height={120}></Skeleton>
                <Skeleton width={"100%"} marginbottom={10} height={120}></Skeleton>
                <Skeleton width={"100%"} marginbottom={10} height={120}></Skeleton>
                <Skeleton width={"100%"} marginbottom={10} height={120}></Skeleton>
                <Skeleton width={"100%"} marginbottom={10} height={120}></Skeleton>
              </>
            ) : (
              "No books found"
            )}
          </div>
        )}
         <div onClick={()=>{setsidebar(!sidebar)}} className="sidebar__toggle--btn">
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="0"
              viewBox="0 0 15 15"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
      </div>
    </div>
  );
}

export default Search;
