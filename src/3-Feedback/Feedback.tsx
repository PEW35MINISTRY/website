import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { callbackify } from 'util';
import CONTENT from '../content';

import './Feedback.scss';

const Feedback = () => {
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [name, setName] = useState<string>();
    const [roleID, setRoleID] = useState<number>(1);

    const [response, setResponse] = useState<Map<string, string>>(new Map());

    const handleResponse = (prompt: string, value: string) => {
        setResponse(res => new Map(res.set(prompt, value)));

        console.log(response);
    }

    const getResponse = (prompt: string):string => response.get(prompt) || '';

    const handleRoleSelection = (id: number) => {
        setRoleID(id);
        handleResponse('ROLE', CONTENT.feedback.groups[id].name);
    }
    useEffect(()=>handleRoleSelection(roleID),[]);



    const handleSubmit = () => {
        setSubmitted(true);




    }

    return (submitted 
        ? <div id="feedback-submitted">
            <h3>Thank you for your feedback{name ? ' ' : ''}{name}!</h3>
        </div>
        : <div id="feedback">
            <h2>Feedback</h2>
            <h3 id='welcome' className={name ? '' : 'none'}>Welcome {name},</h3>
            <div id="horizontal-wrapper">
                <div id="prayer-wrapper">
                    <Paragraph key={'Prayer'} prompt={CONTENT.feedback['prayer-prompt']} value={getResponse(CONTENT.feedback['prayer-prompt'])}
                        callBack={handleResponse} />
                </div>
                <div id="vertical-wrapper">
                    <div id="general-questions">
                        {
                            CONTENT.feedback.general.map((question, i) => getInput({ ...question, key: `General Questions: ${i}`, value: getResponse(question.prompt), callBack: handleResponse}))
                        }

                        <label htmlFor='Role Selection'>Which Role fits you?</label>
                    </div>

                    <div id="role-selector-box">
                        {
                            CONTENT.feedback.groups.map((group, i) => <button key={`Role: ${i}`} className={`group-selector ${i === roleID ? 'selected' : ''}`}
                                onClick={() => handleRoleSelection(i)}>{group.name}</button>)
                        }
                    </div>
                    <div id="role-questions">
                        {
                            CONTENT.feedback.groups[roleID].questions.map((question, i) => getInput({ ...question, key: `${CONTENT.feedback.groups[roleID].name} Questions: ${i}`, value: getResponse(question.prompt), callBack: handleResponse}))
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
const getInput = ({ ...question }: { key: any, type: string, prompt: string, options?: string[], value?:string, callBack?: any }) => {
    switch (question.type) {
        case 'field':
            return <Field key={question.key} prompt={question.prompt} value={question.value}
                callBack={question.callBack} />
        case 'paragraph':
            return <Paragraph key={question.key} prompt={question.prompt} value={question.value}
                callBack={question.callBack} />
        case 'option':
            return <Option key={question.key} prompt={question.prompt} options={question.options || []} value={question.value}
                callBack={question.callBack} />
        case 'select':
            return <Select key={question.key} prompt={question.prompt} options={question.options || []} value={question.value}
                callBack={question.callBack} />
        case 'drop':
            return <Drop key={question.key} prompt={question.prompt} options={question.options || []} value={question.value}
                callBack={question.callBack} />
    }
}

const Field = ({ ...props }: { key: any, prompt: string, value?:string, callBack: any }) => {

    return (
        <div key={props.key} className="input-box input-field">
            <label htmlFor={String(props.prompt)}>{props.prompt}</label>
            <input name={String(props.prompt)} type="text" value={props.value} 
                onChange={(e) => props.callBack(props.prompt, e.target.value)} />
        </div>
    );
}

const Paragraph = ({ ...props }: { key: any, prompt: string, value?:string, callBack: any }) => {

    return (
        <div key={props.key} className="input-box input-paragraph">
            <label htmlFor={String(props.prompt)}>{props.prompt}</label>
            <textarea name={String(props.prompt)} value={props.value} 
                onChange={(e) => props.callBack(props.prompt, e.target.value)} ></textarea>
        </div>
    );
}

//Single Select
const Option = ({ ...props }: { key: any, prompt: string, options: string[], value?:string, callBack?: any }) => {
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(()=>setSelected(props.value || ''), [props.value]);

    const handleSelection = (option: string) => {
        setSelected(option);
        props.callBack(props.prompt, option);
    }

    return (
        <div key={props.key} className="input-box input-option">
            <label htmlFor={String(props.prompt)}>{props.prompt}</label>
            <div className='options-box'>
                {
                    props.options.map((option, i) =>
                        <h4 key={i} className={selected === option ? 'selected' : ''}
                        onClick={()=>handleSelection(option)}>{option}</h4>
                    )
                }
            </div>
        </div>
    );
}

//Multiple Select
const Select = ({ ...props }: { key: any, prompt: string, options: string[], value?:string, callBack?: any }) => {
    const [selectedList, setSelectedList] = useState<string[]>([]);
    
    useEffect(()=>{
        if(props.value?.length)
            setSelectedList(JSON.parse(props.value || '') || []);

            console.log('Setting', props.value,  selectedList);

    }, [props.value]);

    const handleSelection = (option: string) => {
        const list = [...selectedList];
        if(list.includes(option))
            list.splice(list.indexOf(option), 2);
        else
            list.push(option);

            setSelectedList([...list]);
        props.callBack(props.prompt, JSON.stringify(list));
        console.log(option, '=>', list);
    }

    return (
        <div key={props.key} className="input-box input-select">
            <div className='label-box'>
                <label htmlFor={String(props.prompt)}>{props.prompt}</label>
                <h6>Select Multiple</h6>
            </div>
            <div className='options-box'>
                {
                    props.options.sort((a,b)=>a.length-b.length).map((option, i) =>
                        <h4 key={i} className={selectedList.includes(option) ? 'selected' : ''}
                            onClick={()=>handleSelection(option)}>{option}</h4>
                    )
                }
            </div>
        </div>
    );
}

const Drop = ({ ...props }: { key: any, prompt: string, options: string[], value?:string, callBack?: any }) => {

    return (
        <div key={props.key} className="input-box input-drop">
            <label htmlFor={String(props.prompt)}>{props.prompt}</label>
            <select name={String(props.prompt)} value={props.value}
                onChange={(e) => props.callBack(props.prompt, e.target.value)}>
                {
                    props.options.map((option, i) =>
                        <option key={i} value={option} >{option}</option>
                    )
                }
            </select>
        </div>
    );
}
