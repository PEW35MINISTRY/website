import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { urlToHttpOptions } from 'url';
import CONTENT from '../content';

import './Feedback.scss';

const Feedback = () => {
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [name, setName] = useState<string>('Steve');
    const [roleID, setRoleID] = useState<number>(1);


    const handleSubmit = () => {
        setSubmitted(true);




    }

    return (submitted 
        ? <div id="feedback-submitted">
            <h3>Thank you for your feedback{name ? ' ' : ''}{name}!</h3>
        </div>
        : <div id="feedback">
            <h2>Feedback</h2>
            <h3 id='welcome'></h3>
            <div id="horizontal-wrapper">
                <div id="prayer-wrapper">
                    <Paragraph key={'Prayer'} prompt={CONTENT.feedback['prayer-prompt']}
                        callBack={() => { }} />
                </div>
                <div id="vertical-wrapper">
                    <div id="general-questions">
                        {
                            CONTENT.feedback.general.map((question, i) => getInput({ ...question, key: i }))
                        }

                        <label htmlFor="">Which Role fits you?</label>
                    </div>

                    <div id="role-selector-box">
                        {
                            CONTENT.feedback.groups.map((group, i) => <button key={i} className={`group-selector ${i === roleID ? 'selected' : ''}`}
                                onClick={() => setRoleID(i)}>{group.name}</button>)
                        }
                    </div>
                    <div id="role-questions">
                        {
                            CONTENT.feedback.groups[roleID].questions.map((question, i) => getInput({ ...question, key: i }))
                        }
                    </div>
                    <button id="submit" onClick={handleSubmit}>Send Feedback</button>
                </div>
            </div>
        </div>
    );
}
export default Feedback;


//Input Type Components
const getInput = ({ ...question }: { key: any, type: string, prompt: string, options?: string[], callBack?: Function }) => {
    switch (question.type) {
        case 'field':
            return <Field key={question.key} prompt={question.prompt}
                callBack={() => { }} />
        case 'paragraph':
            return <Paragraph key={question.key} prompt={question.prompt}
                callBack={() => { }} />
        case 'option':
            return <Option key={question.key} prompt={question.prompt} options={question.options || []}
                callBack={() => { }} />
        case 'select':
            return <Select key={question.key} prompt={question.prompt} options={question.options || []}
                callBack={() => { }} />
        case 'drop':
            return <Drop key={question.key} prompt={question.prompt} options={question.options || []}
                callBack={() => { }} />
    }
}

const Field = ({ ...props }: { key: any, prompt: string, callBack: Function }) => {

    return (
        <div key={props.key} className="input-box input-field">
            <label htmlFor="">{props.prompt}</label>
            <input type="text" onChange={(e) => props.callBack(e.target.value)} />
        </div>
    );
}

const Paragraph = ({ ...props }: { key: any, prompt: string, callBack: Function }) => {

    return (
        <div key={props.key} className="input-box input-paragraph">
            <label htmlFor="">{props.prompt}</label>
            <textarea name="" id="" ></textarea>
        </div>
    );
}

const Option = ({ ...props }: { key: any, prompt: string, options: string[], callBack: Function }) => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div key={props.key} className="input-box input-option">
            <label htmlFor="">{props.prompt}</label>
            <div className='options-box'>
                {
                    props.options.map((option, i) =>
                        <h4 className={selected === option || i % 2 ? 'selected' : ''}>{option}</h4>
                    )
                }
            </div>
        </div>
    );
}

const Select = ({ ...props }: { key: any, prompt: string, options: string[], callBack: Function }) => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div key={props.key} className="input-box input-select">
            <div className='label-box'>
                <label htmlFor="">{props.prompt}</label>
                <h6>Select Multiple</h6>
            </div>
            <div className='options-box'>
                {
                    props.options.sort((a,b)=>a.length-b.length).map((option, i) =>
                        <h4 className={selected === option || i % 2 ? 'selected' : ''}>{option}</h4>
                    )
                }
            </div>
        </div>
    );
}

const Drop = ({ ...props }: { key: any, prompt: string, options: string[], callBack: Function }) => {

    return (
        <div key={props.key} className="input-box input-drop">
            <label htmlFor="">{props.prompt}</label>
            <select name="cars" id="cars" onChange={(e) => props.callBack(e.target.value)}>
                {
                    props.options.map((option, i) =>
                        <option key={i} value={option}>{option}</option>
                    )
                }
            </select>
        </div>
    );
}
