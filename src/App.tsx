import React from 'react';

import './App.css';
import Home from './Pages/Home.jsx';
import {useState} from  'react';
import { Route, Routes, BrowserRouter } from "react-router-dom"
import ForYou from './Pages/ForYou';

function App() {
  const [modal, setmodal] = useState(false)
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

<Route path='/' element={<Home modal={modal}  setmodal={setmodal}></Home>}></Route>
<Route path='/for-you' element={<ForYou></ForYou>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
