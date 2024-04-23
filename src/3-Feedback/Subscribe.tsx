import React, { useState, useEffect, forwardRef, useRef } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { FeedbackResponseItem, Field, getEmailNote, getInput, Paragraph, STATIC_EMAIL, validateEmail } from './Feedback';
import CONTENT from '../content';

import './Feedback.scss';

const Subscribe = (props:{expandQuestions?:boolean, onSuccess?:() => void, onCancel?:() => void}) => {
    const reCaptchaRef = useRef<ReCAPTCHA | null>(null);

    const [expandQuestions, setExpandQuestions] = useState<boolean>(props.expandQuestions ?? true);
    const [responseMap, setResponseMap] = useState<Map<string, string>>(new Map());
    const emailResponse:FeedbackResponseItem = { uid: '[1]-Email', formID: CONTENT.subscription['email-formID'], prompt:'Email:' };


    const handleResponse = (responseItem: FeedbackResponseItem, value: string) => {
        setResponseMap(res => new Map(res.set(JSON.stringify(responseItem), value)));
    }

    const getResponse = (responseItem: FeedbackResponseItem): string => responseMap.get(JSON.stringify(responseItem)) || '';


    const onSubscribe = () => {
        const jsonBody:Object = {};
        //@ts-ignore        
        responseMap.forEach((value:string, stringifiedItem:string) => jsonBody[JSON.parse(stringifiedItem).formID] = value);        
        
        axios.post(`${process.env.REACT_APP_DOMAIN}/subscribe`,jsonBody)
            .then((response) => { setResponseMap(new Map());
                if(props.onSuccess)props.onSuccess(); })
            .catch((error) => {
                console.error('Error Subscribing:', error, jsonBody);
                props.onCancel && props.onCancel();
            });
    }

    useEffect(() => {
        if(validateEmail(getResponse(emailResponse)))
            setExpandQuestions(true);
    }, [getResponse(emailResponse)]);

    
    return(
        <div id='subscribe' className="vertical-wrapper" >
            <h2>{CONTENT.subscription.title}</h2>
            <div className='general-questions' >
                <Field key={`[KEY]-Email]`} keyObject={emailResponse} note={getEmailNote(getResponse(emailResponse))} type={'email'} valueCallback={getResponse} callBack={handleResponse} />
                {expandQuestions &&
                    CONTENT.subscription.questions.map((details, i) => getInput({ ...details, type: details.type, keyObject: {uid: `question-${i}`, formID: details.formID, prompt: details.prompt}, valueCallback: getResponse, callBack: handleResponse }))
                }
            </div>
            <div className='submit-box'>
                <ReCAPTCHA
                    // className={recaptchaClass}
                    sitekey={process.env.REACT_APP_recaptchaKey || 'Key'}
                    size='invisible'
                    ref={reCaptchaRef}
                />
                {(props.onCancel !== undefined) &&
                    <button id='cancel-button' onClick={props.onCancel}>Cancel</button>}

                {validateEmail(getResponse(emailResponse)) &&
                    <button id='submit' onClick={onSubscribe}>Send Feedback</button>}
            </div>
        </div>
    );
}

export default Subscribe;
