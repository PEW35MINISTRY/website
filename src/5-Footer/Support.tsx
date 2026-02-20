import CONTENT from '../content';

import './Support.scss';

const Support = () => {
  
  
  return(
        <div id='support' className="vertical-wrapper" >
            <h2>{CONTENT.support.title}</h2>
            <a id="contact-box" href={`mailto:${CONTENT.support.email}?subject=EP Website Request`} target="_blank" rel="noopener noreferrer" >
                <p>{CONTENT.support.subText}</p> 
                <span>&#9993;<label>{CONTENT.support.email}</label></span>
                <button id='primary' type='button' onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigator.clipboard.writeText(CONTENT.support.email); }}>Copy Email</button>
            </a>         
        </div>
    );
}

export default Support;
