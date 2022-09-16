import React, { useState, useEffect, forwardRef, useRef } from 'react';
import CONTENT from '../content';

import './Pages.scss';

const Pages = () => {


    return (
        <div id="pages">
            <h2>Key Features</h2>
            <div id="pages-wrapper">
                {CONTENT.pages.map((page, i) =>
                    <div className={`page ${(i % 2) ? 'left-order' : 'right-order'}`} >
                        <div className="info">
                            <h3>{page.title}</h3>
                            <div>
                                <p >{page.description}</p>
                            </div>
                        </div>
                        <img src={String(page.image)} alt={page.title} />
                    </div>
                )}
            </div>
        </div>
    );
}
export default Pages;