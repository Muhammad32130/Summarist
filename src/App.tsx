import React from 'react';

import './App.css';
import Home from './Pages/Home.jsx';
import {useState} from  'react';
import { Route, Routes, BrowserRouter, useParams } from "react-router-dom"
import Page from './Pages/Page';
import ForYou from './Pages/Foryou';
import Search from './Components/Search';
import Sidebar from './Components/Sidebar';

function App() {
  const [modal, setmodal] = useState(false)





  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

<Route path='/' element={<Home modal={modal}  setmodal={setmodal}></Home>}></Route>


<Route path='/:page' element={<Page></Page>}></Route>
    


      
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
