import React, { useState, useEffect, forwardRef, useRef } from 'react';
import './App.scss';

//Components
import Header from './1-Header/Header';
import Pages from './2-Pages/Pages';
import Feedback from './3-Feedback/Feedback';
import Technical from './4-Technical/Technical';
import Footer from './5-Footer/Footer';
import Subscribe from './3-Feedback/Subscribe';
import Support from './5-Footer/Support';

const App = () => {
  const [showSubscribe, setShowSubscribe] = useState<boolean>(false);

  useEffect(() => {
    if(!localStorage.getItem('subscribe-hide') && window.location.hash === '')
      setShowSubscribe(true);
  }, []);
 
  return (
       <div id='App'>
        <Header />
        <Pages />
        {/* <Feedback /> */}
        <Subscribe expandQuestions={false} />
        {/* <Technical /> */}
        <Support />
        <Footer />
  
      {showSubscribe && 
        <div className='popup-outer-wrapper' onClick={()=>setShowSubscribe(false)}>
          <div className='popup-inner-wrapper' onClick={(event)=>event.stopPropagation()}>
            <Subscribe
              expandQuestions={false}
              onSuccess={() => { setShowSubscribe(false); localStorage.setItem('subscribe-hide', 'true'); }}
              onCancel={() => { setShowSubscribe(false); localStorage.setItem('subscribe-hide', 'true'); }}
            />
          </div>
        </div>}
    </div>
  );
  
}

export default App;
