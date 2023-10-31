import axios from 'axios'
import  {AiOutlineSearch}  from 'react-icons/ai'
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { BiTimeFive } from "react-icons/bi";

function Search() {
  const [booksearch, setbooksearch] = useState(null)
  const [search, setsearch] = useState(null)
  const [audioDurations, setAudioDurations] = useState({});


  function fetchsearch(inp){
    setsearch(inp)
    if(search?.length > 0){
      axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`)
      .then((res)=>{
        setbooksearch(res.data)
      }).catch((err)=>{
        setbooksearch(null)
      })
    }
  }
  useEffect(()=>{

    if (search?.length<1){
      setbooksearch(null)
    }
  })




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
    <div className='search-bg'>
        <div className='search-wrap'>
            <div className='search-cont'>
            <div className='search-inp'>
        <input onChange={(e)=>{fetchsearch(e.target.value)}} type="text" placeholder='Search for books' className='search' />
            </div>
            <div className='search-ico'>
                <AiOutlineSearch className='li-ico m-0'></AiOutlineSearch>
            </div>
            </div>
            {booksearch !== null && <div className="search__books--wrapper">

               {booksearch?.length > 0 ?
                booksearch.map((book)=>{
                  const duration = audioDurations[book.id]

                  return(
                    <Link to={`/book/${book.id}`} className='search__book--link'>
                <audio src={book.audioLink} onLoadedMetadata={(e)=>{audiotime(e.target.duration, book.id)}} ></audio>
                <figure className="book__image--wrapper" style={{ height: "80px", width: "80px", minWidth: "80px" }}>
                  <img src={book.imageLink} alt="" className="book__image" />
                </figure>
                <div>
                  <div className="search__book--title">{book.title}</div>
                  <div className="search__book--author">{book.author}</div>
                  <div className="search__book--duration">
                    <div className="recommended__book--details">
                      <div className="recommended__book--details-icon"><BiTimeFive></BiTimeFive></div>
                      <div className="recommended__book--details-text">{formatDuration(duration)}</div>
                    </div>
                  </div>
                </div>
              </Link>
                    )
                }): 
                "No books found"
                } 
              
            </div> }
          
          
        </div>
    </div>
  )
}

export default Search