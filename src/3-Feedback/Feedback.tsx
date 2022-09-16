import React, { useState, useEffect, forwardRef, useRef } from 'react';
import CONTENT from '../content';

import './Feedback.scss';

const Feedback = () => {
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [name, setName] = useState<string>();
    const [roleID, setRoleID] = useState<number>(1);

    const [response, setResponse] = useState<Map<string, string>>(new Map());

    const handleResponse = (UID: string, value: string) => {
        setResponse(res => new Map(res.set(UID, value)));

        console.log(response);
    }

    const getResponse = (UID: string):string => response.get(UID) || '';

    const handleRoleSelection = (id: number) => {
        handleResponse('[5]-Role: ', CONTENT.feedback.groups[id].name);
        setRoleID(id);
    }
    useEffect(()=>handleRoleSelection(roleID),[]);

    const handleSubmit = () => {
        setSubmitted(true);




    }

    const getRoleUID = (id:number, questionID: number):string => {
        let count = CONTENT.feedback.general.length + 10;
        for(var i=0; i<id; i++) {
            count += CONTENT.feedback.groups[i].questions.length;
        }
        return '[5]-R-' + CONTENT.feedback.groups[id].name + '-' + String(count + questionID + 1) + ': ' + CONTENT.feedback.groups[roleID].questions[questionID].prompt;
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
                    <Paragraph key={`[KEY]-Prayer]`} UID={`[3]-Prayer Request: `} prompt={CONTENT.feedback['prayer-prompt']} valueCallback={getResponse}
                        callBack={handleResponse} />
                </div>
                <div id="vertical-wrapper">
                    <div id="general-questions">
                        {
                            CONTENT.feedback.general.map((props, i) => getInput({ ...props, key: `[KEY]-G-${i+1}: `, UID: `[4]-G-${i+1}: ${props.prompt}`, valueCallback: getResponse, callBack: handleResponse}))
                        }

                        <label htmlFor='Role Selection'>Which Role fits you?</label>
                    </div>

                    <div id="role-selector-box">
                        {
                            CONTENT.feedback.groups.map((group, i) => <button key={`Role-${i+1}`} className={`group-selector ${i === roleID ? 'selected' : ''}`}
                                onClick={() => handleRoleSelection(i)}>{group.name}</button>)
                        }
                    </div>
                    <div id="role-questions">
                        {
                            CONTENT.feedback.groups[roleID].questions.map((props, i) => getInput({ ...props, key:`[KEY]-`+getRoleUID(roleID, i), UID: getRoleUID(roleID, i), valueCallback: getResponse, callBack: handleResponse}))
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
const getInput = ({ ...props }: { key: any, UID:string, type: string, prompt: string, options?: string[], valueCallback?: any, callBack?: any }) => {
    switch (props.type) {
        case 'field':
            return <Field key={props.key} UID={props.UID} prompt={props.prompt} valueCallback={props.valueCallback}
                callBack={props.callBack} />
        case 'paragraph':
            return <Paragraph key={props.key} UID={props.UID} prompt={props.prompt} valueCallback={props.valueCallback}
                callBack={props.callBack} />
        case 'option':
            return <Option key={props.key} UID={props.UID} prompt={props.prompt} options={props.options || []} valueCallback={props.valueCallback}
                callBack={props.callBack} />
        case 'select':
            return <Select key={props.key} UID={props.UID} prompt={props.prompt} options={props.options || []} valueCallback={props.valueCallback}
                callBack={props.callBack} />
        case 'drop':
            return <Drop key={props.key} UID={props.UID} prompt={props.prompt} options={props.options || []} valueCallback={props.valueCallback}
                callBack={props.callBack} />
    }
}

const Field = ({ ...props }: {UID:string, prompt: string, valueCallback: any, callBack: any }) => {

    return (
        <div key={props.UID} className="input-box input-field">
            <label htmlFor={String(props.prompt)}>{props.prompt}</label>
            <input name={String(props.prompt)} type="text" value={props.valueCallback(props.UID)} 
                onChange={(e) => props.callBack(props.UID, e.target.value)} />
        </div>
    );
}

const Paragraph = ({ ...props }: {UID:string, prompt: string, valueCallback: any, callBack: any }) => {

    return (
        <div key={props.UID} className="input-box input-paragraph">
            <label htmlFor={String(props.prompt)}>{props.prompt}</label>
            <textarea name={String(props.prompt)} value={props.valueCallback(props.UID)} 
                onChange={(e) => props.callBack(props.UID, e.target.value)} ></textarea>
        </div>
    );
}

//Single Select
const Option = ({ ...props }: {UID:string, prompt: string, options: string[], valueCallback: any,  callBack?: any }) => {
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(()=>setSelected(props.valueCallback(props.UID) || ''), [props.valueCallback(props.UID)]);

    const handleSelection = (option: string) => {
        setSelected(option);
        props.callBack(props.UID, option);
    }

    return (
        <div key={props.UID} className="input-box input-option">
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
const Select = ({ ...props }: {UID:string, prompt: string, options: string[], valueCallback: any,  callBack?: any }) => {
    const [selectedList, setSelectedList] = useState<string[]>([]);
    
    useEffect(()=>{
        if(props.valueCallback(props.UID).length)
            setSelectedList(JSON.parse(props.valueCallback(props.UID) || '') || []);
    }, [props.valueCallback(props.UID)]);

    const handleSelection = (option: string) => {
        const list = [...selectedList];
        if(list.includes(option))
            list.splice(list.indexOf(option), 2);
        else
            list.push(option);

            setSelectedList([...list]);
        props.callBack(props.UID, JSON.stringify(list));
    }

    return (
        <div key={props.UID} className="input-box input-select">
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

const Drop = ({ ...props }: {UID:string, prompt: string, options: string[], valueCallback: any,  callBack?: any }) => {

    return (
        <div key={props.UID} className="input-box input-drop">
            <label htmlFor={String(props.prompt)}>{props.prompt}</label>
            <select name={String(props.prompt)} value={props.valueCallback(props.UID)}
                onChange={(e) => props.callBack(props.UID, e.target.value)}>
                {
                    props.options.map((option, i) =>
                        <option key={i} value={option} >{option}</option>
                    )
                }
            </select>
        </div>
    );
}
