import React, {useState, useEffect, forwardRef, useRef} from 'react';
import useInterval from '../useInterval';
import CONTENT from '../content';
import './Header.scss'; 
import PLAY from '../0-Assets/icon-play.png';

const Demo = () => {
    const [autoPlay, setAutoPlay] = useState<boolean>(true);
    const [firstDemoActive, setFirstDemoActive] = useState<boolean>(true);
    const [firstID, setFirstID] = useState<number>(0);
    const [secondID, setSecondID] = useState<number>(1);
    const [firstScale, setFirstScale] = useState<number>(1);
    const [secondScale, setSecondScale] = useState<number>(1);
    const [firstOpacity, setFirstOpacity] = useState<number>(1)
    const [secondOpacity, setSecondOpacity] = useState<number>(0)


    const maxScale:number = 1.3;
    const getActiveID = ():number => firstDemoActive ? firstID : secondID;
    const selectIDHandler = (id:number):void => {
        setAutoPlay(false);
        setFirstDemoActive(true);
        setFirstID(id);
        setFirstOpacity(1);
        setFirstScale(1);
        setSecondID((firstID+1 < CONTENT.demo.length) ? firstID+1 : 0);
        setSecondOpacity(0);
        setSecondScale(1);
    }



    useInterval(()=>{
        if(autoPlay) {
            if(firstDemoActive) {
                if(firstScale > maxScale) {
                    //decrease Opacity of Demo
                    if(secondScale > maxScale)
                        setSecondScale(1.0);
                    setFirstOpacity(previous => previous -= 0.02);
                    setSecondOpacity(previous => previous += 0.02);
                    setSecondScale(previous => previous += 0.001);

                    if(firstOpacity <= 0) {
                        setFirstID((secondID+1 < CONTENT.demo.length) ? secondID+1 : 0);
                        setFirstDemoActive(false);
                    }
                } else 
                    setFirstScale(previous => previous += 0.001); 
                    
            } else {
                if(secondScale > maxScale) {
                    //decrease Opacity of Demo
                    if(firstScale > maxScale)
                        setFirstScale(1.0);
                    setSecondOpacity(previous => previous -= 0.02);
                    setFirstOpacity(previous => previous += 0.02);
                    setFirstScale(previous => previous += 0.001); 

                    if(secondOpacity <= 0) {
                        setSecondID((firstID+1 < CONTENT.demo.length) ? firstID+1 : 0);
                        setFirstDemoActive(true);
                    }
                } else 
                    setSecondScale(previous => previous += 0.001);
            }
        }
           
    },30);

    return (
        <div className="demo-box">
                <a href={CONTENT.demo[getActiveID()].link} onMouseEnter={()=>setAutoPlay(false)} onMouseLeave={()=>setAutoPlay(true)}>
                    <div className="image-wrapper" style={{position: 'relative', opacity: firstOpacity, zIndex: firstDemoActive ? 2 : 1}}>
                        <img src={String(CONTENT.demo[firstID].image)} alt={CONTENT.demo[firstID].prompt} style={{transform: `scale(${firstScale})`}}/>
                    </div>
                    <div className="image-wrapper" style={{position: 'absolute', opacity: secondOpacity, zIndex: firstDemoActive ? 1 : 2, marginRight: '1.0rem'}}>
                        <img src={String(CONTENT.demo[secondID].image)} alt={CONTENT.demo[secondID].prompt} style={{transform: `scale(${secondScale})`}}/>
                    </div>
                    <h2 id='demo-prompt'>
                        <img src={PLAY} alt="Play Video" id="icon" />
                        {CONTENT.demo[getActiveID()].prompt}
                    </h2>
                </a>
            <div id="demo-menu">
                {CONTENT.demo.map((d,i) => 
                    <button key={i} className={`${(getActiveID() == i) ? 'active' : ''} ${(i !== (CONTENT.demo.length-1)) ? ' divider-right' : ''}`}
                    onClick={()=>selectIDHandler(i)}>{d.name}</button>
                )}
            </div>
            {/* <div id='video-highlight'></div>   */}

        </div>
    );
}

export default Demo;