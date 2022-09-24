import React, { useState, useEffect, forwardRef, useRef } from 'react';
import CONTENT from '../content';

import './Header.scss';
import ABSTRACT from '../0-Assets/square-abstract.png';
import Demo from './Demo';

const Header = () => {
    const topHeaderRef = useRef<null | HTMLDivElement>(null);
    const missionRef = useRef<null | HTMLHeadingElement>(null);
    const demoRef = useRef<null | HTMLHeadingElement>(null);

    const [shapeTop, setShapeTop] = useState<number>(0);
    const [shapeHeight, setShapeHeight] = useState<number>(0);

    useEffect(() => {
        setTimeout(()=> {
        if (topHeaderRef.current && missionRef.current && demoRef.current) {
            let top = missionRef.current.offsetTop + missionRef.current.offsetHeight + 40;
            let height = topHeaderRef.current.offsetHeight - top + 50;
            
            if(demoRef.current.offsetTop > missionRef.current.offsetTop) {
                top = demoRef.current.offsetTop + demoRef.current.offsetHeight - 20;
                height = 50;
            }

            setShapeTop(top);
            setShapeHeight(height);
        }}, 300);
    }, [topHeaderRef.current, missionRef.current, demoRef.current]);

    const updateHandler = () => {
        const card = document.getElementById(CONTENT.update.cardPrompt);
        if (card) {
            card.scrollIntoView();
            card.click();
        }
    }


    return (
        <div id='header'>
            {/* <img src={ABSTRACT} alt="Abstract Background" id="abstract" />  */}

            {/* Relative Elements: Horizontal Layout */}
            <div id="top-row" ref={topHeaderRef}>
                <div id="left-side">
                    <div className="logo-box">
                        <img src={String(CONTENT.logo)} alt={String(CONTENT.logo)} />
                        <h1 >{CONTENT.title}</h1>
                    </div>

                    <h2 className="mission" ref={missionRef}>{CONTENT.mission}
                        <h3 className="goal">{CONTENT.goal}</h3>
                    </h2>

                    <div id="stage-banner">
                        <h3 >{CONTENT.update.title}</h3>
                        <h4>{CONTENT.update.subtitle}</h4>
                        <div className="button-box">
                            <button id="secondary" onClick={() => updateHandler()}>Latest Update</button>
                            <a href='#feedback'>
                                <button id="primary">Give Feedback</button>
                            </a>
                        </div>
                    </div>
                </div>
                <Demo passRef={demoRef} />
            </div>

            <div id="cards-box">
                {CONTENT.cards.map((c, i) => <Card key={i} {...c} />)}
            </div>

            {/* Absolute Elements */}
            <div className="menu-box">
                <a href='#pages' className='hide-mobile'>Design</a>
                <a href='#feedback'>Feedback</a>
                <a href='#technical' className='hide-mobile'>Technical</a>
                <a href='https://pew35.org/support'>
                    <button>SUPPORT</button>
                </a>
            </div>

            <div id="shape-rectangle" style={{ height: shapeTop }}></div>

            <div style={{ marginTop: (shapeTop - 5), height: shapeHeight }} id='shape'>
                <svg viewBox="0 0 500 150" preserveAspectRatio="none">
                    <path d="M-2.49,14.31 C274.02,-18.24 292.64,224.51 507.09,115.96 L500.00,0.00 L0.00,0.00 Z"></path>
                </svg>
            </div>
        </div>
    );
}

export default Header;


interface cardContent {//TS-GOOD
    prompt: string,
    header?: string,
    description: string,
    footer?: string,
    image: any
}

const Card = (content: cardContent) => {
    const cardRef = useRef<null | any>(null);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => { //TS-GOOD
        const testViewable = () => {
            if((cardRef.current.parentNode.offsetTop + cardRef.current.offsetTop) <= (window.pageYOffset)) {
                setOpen(true);         
                window.removeEventListener("scroll", testViewable);
            } 
        }        
        window.addEventListener("scroll", testViewable);      
        return () => {
          window.removeEventListener("scroll", testViewable);
        };
      }, []);

    const getImageOpacity = (): number => open ? 0.1 : 0.7;
    const getInsideOpacity = (): number => open ? 1.0 : 0.0;

    return (
        <div className="card" id={content.prompt} ref={cardRef} onMouseEnter={() => setOpen(true)} onClick={() => setOpen(true)}>
            <div className="description">
                <div className="description-inside" style={{ opacity: getInsideOpacity() }}>
                    {content.header && <label className='header'>{content.header}</label>}
                    {content.description}
                    {content.footer && <label className='footer'>{content.footer}</label>}
                </div>
                {!open
                    ? <h2 className="prompt">{content.prompt}</h2>
                    : <h2 className="prompt-footer">{content.prompt}</h2>
                }
                <img src={String(content.image)} alt={content.prompt} style={{ opacity: getImageOpacity() }} />

            </div>
        </div>
    );
}
