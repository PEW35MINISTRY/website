import React, {useState, useEffect, forwardRef, useRef} from 'react';
import './index.scss';

//Components
import Header from './1-Header/Header';
import Pages from './2-Pages/Pages';
import Feedback from './3-Feedback/Feedback';
import Technical from './4-Technical/Technical';
import Footer from './5-Footer/Footer';

function App() {
  
  return (
    <div id="App">
      <Header />
      <Pages />
      <Feedback />
      <Technical />
      <Footer />      
    </div>
  );
}

export default App;
