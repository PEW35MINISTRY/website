import React, { useState, useEffect, forwardRef, useRef } from 'react';
import AXIOS from 'axios';
import ENCODE from 'query-string-encode';
import EMAILJS from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import CONTENT from '../content';
import './Feedback.scss';

import ICON_DATABASE_SUCCESS from '../0-Assets/database-success.png';
import ICON_DATABASE_FAILURE from '../0-Assets/database-fail.png';
import ICON_EMAIL_SUCCESS from '../0-Assets/email-success.png';
import ICON_EMAIL_FAILURE from '../0-Assets/email-fail.png';

//Response Types
export interface FeedbackResponseItem {
    uid: string,
    formID: string,
    prompt: string,
    value?: string
}

export interface FeedbackSubmitMessage {
    databaseSuccess?: boolean,
    emailSuccess?: boolean,
    mainMessage?: string,
    detailMessage?: string,
    counter?: number,
    redirect?: string,
}

export const STATIC_EMAIL = { uid: '[1]-Email', formID: CONTENT.feedback['email-formID'], prompt: 'Email:' };
export const STATIC_NAME = { uid: '[2]-Name', formID: CONTENT.feedback['name-formID'], prompt: 'Name:' };

//Email Handling
export const validateEmail = (value: string): boolean => /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(value);

export const getEmailNote = (email?:string) => {
    if (!email || !email.length) return 'Required';
    else if (validateEmail(email)) return 'Email Verified';
    else return 'INVALID EMAIL';
}

const Feedback = () => {
    const [submittedMessage, setSubmittedMessage] = useState<FeedbackSubmitMessage>({});
    const [email, setEmail] = useState<string>();
    const [name, setName] = useState<string>();
    const [roleID, setRoleID] = useState<number | null>(null);
    const reCaptchaRef = useRef<ReCAPTCHA | null>(null);

    const [response, setResponse] = useState<Map<string, string>>(new Map());

    //Responses Mapping
    const handleResponse = (staticKey: FeedbackResponseItem, value: string) => {
        setResponse(res => new Map(res.set(JSON.stringify(staticKey), value)));
    }

    const getResponse = (staticKey: FeedbackResponseItem): string => response.get(JSON.stringify(staticKey)) || '';

    const handleRoleSelection = (id: number) => {
        handleResponse({ uid: '[5]-Role', formID: CONTENT.feedback['role-formID'], prompt: 'Role:' }, CONTENT.feedback.roles[id].name);
        setRoleID(id);
    }

    //Initial Posting to Response Map: onLoad
    useEffect(() => {
        if (email) handleResponse(STATIC_EMAIL, email);
        if (name) handleResponse(STATIC_NAME, name);
        // handleRoleSelection(roleID);
    }, [name]);


    const handleEmail = (staticKey: FeedbackResponseItem, value: string) => {
        handleResponse(STATIC_EMAIL, value);
        setEmail(value);

        if(!name && validateEmail(value)) {
            const emailNameRegex: RegExpExecArray | null = new RegExp(/.+(?=@)/).exec(value);
            let extractedName:string = emailNameRegex ? emailNameRegex[0] : '';
            if(extractedName.length > 2)
                extractedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);

            handleResponse(STATIC_NAME, extractedName);
        }
    }


    /*****************
     Form Submitting
    ******************/
    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (email && validateEmail(email) && reCaptchaRef.current != null) {
            //Extract Calculated Name
            const extractedName = getResponse(STATIC_NAME);

            //Extract Response UID and SORT
            const questions: FeedbackResponseItem[] = Array.from(response, ([staticKey, value]) => { return ({ ...JSON.parse(staticKey), value: value.replace(/[^A-Za-z0-9.@_-]/g, " ")}); }).sort((a: FeedbackResponseItem, b: FeedbackResponseItem) => ((a.uid).localeCompare(b.uid)));

            const emailResponse: string = questions.reduce((current, res, index) => current += `<strong>${index + 1}) ${res.prompt}</strong><p>${res.value}</p>`, '<div>') + '</div>';
            const token = await reCaptchaRef.current.executeAsync();
            const emailParameters = { name: name || extractedName, role: CONTENT.feedback.roles[roleID || 0].name, email: email, feedback: emailResponse, 'g-recaptcha-response': token };

            EMAILJS.send(`${process.env.REACT_APP_emailServiceId}`, `${process.env.REACT_APP_emailTemplateId}`, emailParameters, `${process.env.REACT_APP_emailUserId}`)
                .then((res: any) => {
                    console.log('Feedback Sent!', res.status, res.text);
                    setSubmittedMessage((current) => ({ ...current, emailSuccess: true }));
                }, (err: any) => {
                    console.log('FAILED...', err);
                    setSubmittedMessage((current) => ({ ...current, emailSuccess: false }));
                });

            //Submit to Google Forms: https://docs.google.com/forms/d/10htIlpcVD-EsQZtjTq8nzCpQXORVjZKxsZJrluyWqxw/prefill
            const combine: string = questions.reduce((result, current) => result += `"${current.formID}":"${current.value}",`, '{');
            const queryParameters: string = combine.substring(0, combine.length - 1) + '}';

            AXIOS.post(CONTENT.feedback['cors-proxy'] + CONTENT.feedback['google-form'] + 'formResponse?' + ENCODE(JSON.parse(queryParameters)), null, {  //TODO: Temporary Proxy
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then((res) => {
                    console.log('Feedback Saved', res);
                    setSubmittedMessage((current) => ({ ...current, databaseSuccess: true, mainMessage: CONTENT.feedback['submit-success'] }));
                })
                .catch((err) => {
                    console.error('Feedback Failed', err);
                    setSubmittedMessage((current) => ({ ...current, databaseSuccess: false, mainMessage: CONTENT.feedback['submit-fail'], detailMessage: CONTENT.feedback['submit-fail-directions'] }));
                    let count: number = 10;
                    const interval = setInterval(() => {
                        setSubmittedMessage((current) => ({ ...current, counter: count }));
                        count -= 1;
                        if (count <= 0) {
                            window.location.assign(CONTENT.feedback['google-form'] + 'viewform?' + ENCODE(JSON.parse(queryParameters)));
                            clearInterval(interval);
                        }
                    }, 1000);
                });

            //Scroll to Submit Message
            const message: HTMLElement | null = document.getElementById("feedback-submitted");
            if (message != null) message.scrollIntoView();

        } else {
            //Scroll to Invalid Email
            const emailInput: HTMLElement | null = document.getElementById(STATIC_EMAIL.uid);
            if (emailInput != null) emailInput.scrollIntoView(); //TS-GOOD
        }
        if (reCaptchaRef.current != null) reCaptchaRef.current.reset();
    }

    return ((submittedMessage.databaseSuccess && submittedMessage.emailSuccess)
        ? <SubmitSuccess {...submittedMessage} />

        : (submittedMessage.mainMessage)
            ? <SubmitFailure {...submittedMessage} />

            : <div id="feedback">
                <h2>{CONTENT.feedback.title}</h2>
                <h3 id='welcome' className={(name && name.length) ? '' : 'none'}>Welcome {name},</h3>
                <div className="horizontal-wrapper">
                    <div id="prayer-wrapper">
                        <Paragraph key={`[KEY]-Prayer]`} keyObject={{ uid: `[2]-Prayer`, formID: CONTENT.feedback['prayer-formID'], prompt: CONTENT.feedback['prayer-prompt'] }} valueCallback={getResponse}
                            callBack={handleResponse} />
                    </div>
                    <div className="vertical-wrapper">
                        <div id="general-questions">
                            <Field key={`[KEY]-Email]`} keyObject={STATIC_EMAIL} note={getEmailNote(email)} type={'email'} valueCallback={() => email}
                                callBack={handleEmail} />
                            {
                                CONTENT.feedback.general.map((props, i) => getInput({ ...props, keyObject: { uid: `[4]-${i}`, formID: props.formID, prompt: props.prompt }, valueCallback: getResponse, callBack: handleResponse }))
                            }

                            <label htmlFor='Role Selection'>Which Role fits you?</label>
                        </div>

                        <div id="role-selector-box">
                            {
                                CONTENT.feedback.roles.map((group, i) => <button key={`Role-${i + 1}`} className={`group-selector ${i === roleID ? 'selected' : ''}`}
                                    onClick={() => handleRoleSelection(i)}>{group.name}</button>)
                            }
                        </div>
                        <div className={`role-questions ${roleID != null ? '' : 'none'}`}>
                            {
                                CONTENT.feedback.roles[roleID || 0].questions.map((props, i) => getInput({ ...props, keyObject: { uid: `[6]-${roleID}-${i}`, formID: props.formID, prompt: props.prompt }, valueCallback: getResponse, callBack: handleResponse }))
                            }
                        </div>
                        <div className="submit-box">
                            <button id="submit" onClick={handleSubmit}>Send Feedback</button>
                        </div>


                    </div>
                </div>
            </div>
    );
}
export default Feedback;

export const SubmitSuccess = (props: FeedbackSubmitMessage) =>
    <div id="feedback-submitted">
        <h3>{props.mainMessage}</h3>
    </div>;

export const SubmitFailure = (props: FeedbackSubmitMessage) =>
    <a href={props.redirect}>
        <div id="feedback-submitted" className='fail'>
            <h3>{props.mainMessage}</h3>
            <div>
                {(props.emailSuccess) ? <img src={ICON_EMAIL_SUCCESS} alt="Email Success" id="icon" /> : <img src={ICON_EMAIL_FAILURE} alt="Email Failure" id="icon" />}
                <strong>{props.counter}</strong>
                {(props.databaseSuccess) ? <img src={ICON_DATABASE_SUCCESS} alt="Database Failure" id="icon" /> : <img src={ICON_DATABASE_FAILURE} alt="Database Failure" id="icon" />}
            </div>
            <h5>{props.detailMessage}</h5>
        </div>
    </a>;


//Input Type Components
export const getInput = ({ ...props }: { keyObject: FeedbackResponseItem, type: string, options?: string[], valueCallback?: any, callBack?: any }) => {//TS-GOOD
    switch (props.type) {
        case 'field':
            return <Field key={props.keyObject.uid} keyObject={props.keyObject} valueCallback={props.valueCallback}
                callBack={props.callBack} />
        case 'paragraph':
            return <Paragraph key={props.keyObject.uid} keyObject={props.keyObject} valueCallback={props.valueCallback}
                callBack={props.callBack} />
        case 'option':
            return <Option key={props.keyObject.uid} keyObject={props.keyObject} options={props.options || []} valueCallback={props.valueCallback}
                callBack={props.callBack} />
        case 'select':
            return <Select key={props.keyObject.uid} keyObject={props.keyObject} options={props.options || []} valueCallback={props.valueCallback}
                callBack={props.callBack} />
        case 'drop':
            return <Drop key={props.keyObject.uid} keyObject={props.keyObject} options={props.options || []} valueCallback={props.valueCallback}
                callBack={props.callBack} />
    }
}

export const Prompt = ({ ...props }: { prompt: string, note?: string | null, }) => {
    return (
        <div className='label-box'>
            <label htmlFor={String(props.prompt)}>{props.prompt}</label>
            <strong className={props.note && props.note == 'Required' || props.note?.toLowerCase().includes('invalid') ? 'required' : props.note ? '' : 'none'}>{props.note}</strong>
        </div>
    );
}

export const Field = ({ ...props }: { keyObject: FeedbackResponseItem, note?: string | null, type?: string | null, valueCallback: any, callBack: any }) => {

    return (
        <div key={props.keyObject.uid} id={props.keyObject.uid} className="input-box input-field">
            <Prompt prompt={props.keyObject.prompt} note={props.note || (props.keyObject.formID)} />
            <input name={String(props.keyObject.prompt)} type={props.type || "text"} value={props.valueCallback(props.keyObject)}
                onChange={(e) => props.callBack(props.keyObject, e.target.value)} />
        </div>
    );
}

export const Paragraph = ({ ...props }: { keyObject: FeedbackResponseItem, note?: string | null, valueCallback: any, callBack: any }) => {

    return (
        <div key={props.keyObject.uid} id={props.keyObject.uid} className="input-box input-paragraph">
            <Prompt prompt={props.keyObject.prompt} note={props.note} />
            <textarea name={String(props.keyObject.prompt)} value={props.valueCallback(props.keyObject)}
                onChange={(e) => props.callBack(props.keyObject, e.target.value)} ></textarea>
        </div>
    );
}

//Single Select
export const Option = ({ ...props }: { keyObject: FeedbackResponseItem, note?: string | null, options: string[], valueCallback: any, callBack?: any }) => {
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(() => setSelected(props.valueCallback(props.keyObject) || ''), [props.valueCallback(props.keyObject)]);

    const handleSelection = (option: string) => {
        setSelected(option);
        props.callBack(props.keyObject, option);
    }

    return (
        <div key={props.keyObject.uid} id={props.keyObject.uid} className="input-box input-option">
            <Prompt prompt={props.keyObject.prompt} note={props.note} />
            <div className='options-box'>
                {
                    props.options.map((option, i) =>
                        <h4 key={i} className={selected === option ? 'selected' : ''}
                            onClick={() => handleSelection(option)}>{option}</h4>
                    )
                }
            </div>
        </div>
    );
}

//Multiple Select
export const Select = ({ ...props }: { keyObject: FeedbackResponseItem, note?: string | null, options: string[], valueCallback: any, callBack?: any }) => {
    const [selectedList, setSelectedList] = useState<string[]>([]);

    useEffect(() => {
        if (props.valueCallback(props.keyObject).length)
            setSelectedList(JSON.parse(props.valueCallback(props.keyObject) || '') || []);
    }, [props.valueCallback(props.keyObject)]);

    const handleSelection = (option: string) => {
        const list = [...selectedList];
        if (list.includes(option))
            list.splice(list.indexOf(option), 2);
        else
            list.push(option);

        setSelectedList([...list]);
        props.callBack(props.keyObject, JSON.stringify(list));
    }

    return (
        <div key={props.keyObject.uid} id={props.keyObject.uid} className="input-box input-select">
            <Prompt prompt={props.keyObject.prompt} note={'Select Multiple' + (props.note || '')} />
            <div className='options-box'>
                {
                    props.options.sort((a, b) => a.length - b.length).map((option, i) =>
                        <h4 key={i} className={selectedList.includes(option) ? 'selected' : ''}
                            onClick={() => handleSelection(option)}>{option}</h4>
                    )
                }
            </div>
        </div>
    );
}

export const Drop = ({ ...props }: { keyObject: FeedbackResponseItem, note?: string | null, options: string[], valueCallback: any, callBack?: any }) => {

    return (
        <div key={props.keyObject.uid} id={props.keyObject.uid} className="input-box input-drop">
            <Prompt prompt={props.keyObject.prompt} note={props.note} />
            <select name={String(props.keyObject.uid)} value={props.valueCallback(props.keyObject)}
                onChange={(e) => props.callBack(props.keyObject, e.target.value)}>
                {
                    props.options.map((option, i) =>
                        <option key={i} value={option} >{option}</option>
                    )
                }
            </select>
        </div>
    );
}
