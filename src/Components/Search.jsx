import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

function Search() {
  return (
    <div className='search-bg'>
        <div className='search-wrap'>
            <div className='search-cont'>
            <div className='search-inp'>
        <input type="text" placeholder='Search for books' className='search' />
            </div>
            <div className='search-ico'>
                <AiOutlineSearch className='li-ico m-0'></AiOutlineSearch>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Search