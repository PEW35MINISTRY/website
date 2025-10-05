import React, { useState, useEffect, forwardRef, useRef } from 'react';
import CONTENT from '../content';

import './Footer.scss';
import PEW35LOGO from '../0-Assets/pew35-logo.png';
import SLOGAN from '../0-Assets/pew35-slogan.png';

const Footer = () => {
    const footerRef = useRef<null | HTMLDivElement>(null);
    const footerShapeRef = useRef<null | HTMLDivElement>(null);
    const [rectangleHeight, setRectangleHeight] = useState<number>(0);

    useEffect(() => {
        setTimeout(()=> {
        if (footerRef.current && footerShapeRef.current) {
            setRectangleHeight(footerRef.current.offsetHeight - footerShapeRef.current.offsetHeight + 10); //10px overlap vertically
        }}, 300);
    }, [footerRef.current, footerShapeRef.current]);

    return (
        <div id="footer" ref={footerRef}>
            <div id="wrapper" >
                <a href='https://pew35.org/'>
                    <img id="pew35-logo" src={PEW35LOGO} alt="Pew35" />
                </a>
                <div id="documents">
                    <h3>{CONTENT.documents.title}</h3>
                    {
                        CONTENT.documents.references.map((reference, i) =>
                            <a key={i} href={reference.link}><h4 >{reference.name}</h4></a>)
                    }
                </div>
                <div id="references">
                    <h3>{CONTENT.information.title}</h3>
                    {
                        CONTENT.information.references.map((reference, i) =>
                            <a key={i} href={reference.link}><h4 >{reference.name}</h4></a>)
                    }
                </div>


            </div>
            {/* <img id="pew35-slogan" src={SLOGAN} alt="Slogan" /> */}

            <div id="footer-background">
                <div id='footer-shape' ref={footerShapeRef}>
                    <svg viewBox="0 0 1440 320" preserveAspectRatio="none"><path d="M0,96L60,117.3C120,139,240,181,360,176C480,171,600,117,720,80C840,43,960,21,1080,42.7C1200,64,1320,128,1380,160L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                    </svg>
                </div>

                <div id="footer-rectangle" style={{height: rectangleHeight}}></div>
            </div>
        </div>
    );
}
export default Footer;