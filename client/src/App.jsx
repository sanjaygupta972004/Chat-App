import React from 'react';
import {  Routes,  Route} from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import Chatpage from './pages/Chatpage.jsx';

import { image } from './assets/bgcImage.js';

function App() {
  return (
  
     <div className= "bg-center bg-cover flex min-h-[100vh]" style={{backgroundImage: ` url(${image.url3})`}}>
         <h2>kjhkhkdshgfjkg</h2>
        <Routes>
          <Route path="/" exact element = {<Homepage/>} />
          <Route path="/chat"  element = {<Chatpage/>} />
         </Routes>
   </div>
  );
}

export default App;
