import React, { useState, useEffect, forwardRef, useRef } from 'react';
import './App.scss';

//Components
import Header from './1-Header/Header';
import Pages from './2-Pages/Pages';
import Feedback from './3-Feedback/Feedback';
import Technical from './4-Technical/Technical';
import Footer from './5-Footer/Footer';
import Subscribe from './3-Feedback/Subscribe';

const App = () => {
  const [showSubscribe, setShowSubscribe] = useState<boolean>(window.location.hash === '');
 
  return (
       <div id='App'>
        <Header />
        <Pages />
        {/* <Feedback /> */}
        <Subscribe />
        {/* <Technical /> */}
        <Footer />
  
      {showSubscribe && 
        <div className='popup-outer-wrapper' onClick={()=>setShowSubscribe(false)}>
          <div className='popup-inner-wrapper' onClick={(event)=>event.stopPropagation()}>
            <Subscribe
              expandQuestions={false}
              onSuccess={()=>setShowSubscribe(false)}
              onCancel={()=>setShowSubscribe(false)}
            />
          </div>
        </div>}
    </div>
  );
  
}

export default App;
