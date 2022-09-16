import React, {useState, useEffect, forwardRef, useRef} from 'react';
import CONTENT from '../content';

import './Technical.scss'; 
import DOWNLOAD from '../0-Assets/icon-download.png';

const Technical = () => {


    return (
        <div id="technical">
            <h2>Technical Design</h2>
            <div id="card-box">
                {CONTENT.technical.map((tech,i) => 
                    <a className="card" href={tech.file} >
                        <img src={DOWNLOAD} alt={tech.name} />
                        <h3>{tech.name}</h3>
                        </a>
                )}
            </div>
        </div>
    );
}
export default Technical;