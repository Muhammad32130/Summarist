import React from 'react'

import Sidebar from '../Components/Sidebar'
import Search from '../Components/Search'
import {useEffect} from 'react'
import ForYou from './Foryou'
import Library from './Library'
import { useLocation } from 'react-router'
import Settings from './Settings'


function Page() {
const location = useLocation()
  
  return (
    <div className='foru-main'>
      <div className="wrapper">

      <Sidebar ></Sidebar>
      <Search></Search>
{location.pathname ==='/for-you' && <ForYou></ForYou>}
{location.pathname ==='/Library' && <Library></Library>}
{location.pathname ==='/settings' && <Settings></Settings>}


      </div>
    </div>
  )
}

export default Page