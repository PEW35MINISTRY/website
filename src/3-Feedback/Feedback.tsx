import React, { useState, useEffect, forwardRef, useRef } from 'react';
import EMAILJS from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import CONTENT from '../content';
import './Feedback.scss';

const Feedback = () => {
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [email, setEmail] = useState<string>();
    const [name, setName] = useState<string>();
    const [roleID, setRoleID] = useState<number | null>(null);
    const reCaptchaRef = useRef<ReCAPTCHA | null>(null);

    const [response, setResponse] = useState<Map<string, string>>(new Map());

    //Responses Mapping
    const handleResponse = (UID: string, value: string) => {
        setResponse(res => new Map(res.set(UID, value)));

        console.log(response);
    }

    const getResponse = (UID: string): string => response.get(UID) || '';

    const handleRoleSelection = (id: number) => {
        handleResponse('[5]-Role: ', CONTENT.feedback.groups[id].name);
        setRoleID(id);
    }

    //Initial Posting to Response Map: onLoad
    useEffect(() => {
        if (email) handleResponse('[1]-Email: ', email);
        if (name) handleResponse('[2]-Name: ', name);
        // handleRoleSelection(roleID);
    }, [name]);

    //Email Handling
    const validateEmail = (value: string): boolean => /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(value);

    const handleEmail = (UID: string, value: string) => {
        handleResponse('[1]-Email: ', value);
        setEmail(value);
    }

    const getEmailNote = () => {
        if (!email || !email.length) return 'Required';
        else if (validateEmail(email)) return 'Email Verified';
        else return 'INVALID EMAIL';
    }

    //Form Submitting
    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (email && validateEmail(email) && reCaptchaRef.current != null) {
            //Extract Name
            const emailNameRegex: RegExpExecArray | null = new RegExp(/.+(?=@)/).exec(email);
            const emailName: string = emailNameRegex ? emailNameRegex[0] : '';

            //Format Body
            const questions: string[] = Array.from(response, (prompt, result) => `${prompt}\n${result}`);
            const body = questions.sort((a: string, b: string) => (a.localeCompare(b))).join('\n');

            //Recaptcha Call
            const token = await reCaptchaRef.current.executeAsync();

            const emailParameters = { name: name || emailName, role: CONTENT.feedback.groups[roleID || 0].name, email: email, body: body, 'g-recaptcha-response': token };
            console.log('Sending Feedback:', emailParameters);

            EMAILJS.send(`${process.env.REACT_APP_emailServiceId}`, `${process.env.REACT_APP_emailTemplateId}`, emailParameters, `${process.env.REACT_APP_emailUserId}`)
                .then((res: any) => {
                    console.log('SUCCESS!', res.status, res.text);
                    setSubmitted(true);

                    //Scroll to Thanks Message
                    const message: HTMLElement | null = document.getElementById("feedback-submitted");
                    if (message != null) message.scrollIntoView();
                }, (err: any) => {
                    console.log('FAILED...', err);
                });

        } else {//Scroll to Invalid Email
            const emailInput: HTMLElement | null = document.getElementById('[1]-Email: ');
            if (emailInput != null) emailInput.scrollIntoView(); //TS-GOOD
        }
        if (reCaptchaRef.current != null) reCaptchaRef.current.reset();
    }

    const getRoleUID = (id: number, questionID: number): string => {//TS-GOOD
        let count = CONTENT.feedback.general.length + 10;
        for (var i = 0; i < id; i++) {
            count += CONTENT.feedback.groups[i].questions.length;
        }
        return '[5]-R-' + CONTENT.feedback.groups[id].name + '-' + String(count + questionID + 1) + ': ' + CONTENT.feedback.groups[roleID || 0].questions[questionID].prompt;
    }

    return (submitted
        ? <div id="feedback-submitted">
            <h3>Thank you for your feedback{name ? ' ' : ''}{name}!</h3>
        </div>
        : <div id="feedback">
            <h2>Feedback</h2>
            <h3 id='welcome' className={(name && name.length) ? '' : 'none'}>Welcome {name},</h3>
            <div id="horizontal-wrapper">
                <div id="prayer-wrapper">
                    <Paragraph key={`[KEY]-Prayer]`} UID={`[3]-Prayer Request: `} prompt={CONTENT.feedback['prayer-prompt']} valueCallback={getResponse}
                        callBack={handleResponse} />
                </div>
                <div id="vertical-wrapper">
                    <div id="general-questions">
                        <Field key={`[KEY]-Email]`} UID={'[1]-Email: '} prompt={'Enter Email:'} note={getEmailNote()} type={'email'} valueCallback={() => email}
                            callBack={handleEmail} />
                        {
                            CONTENT.feedback.general.map((props, i) => getInput({ ...props, key: `[KEY]-G-${i + 1}: `, UID: `[4]-G-${i + 1}: ${props.prompt}`, valueCallback: getResponse, callBack: handleResponse }))
                        }

                        <label htmlFor='Role Selection'>Which Role fits you?</label>
                    </div>

                    <div id="role-selector-box">
                        {
                            CONTENT.feedback.groups.map((group, i) => <button key={`Role-${i + 1}`} className={`group-selector ${i === roleID ? 'selected' : ''}`}
                                onClick={() => handleRoleSelection(i)}>{group.name}</button>)
                        }
                    </div>
                    <div id="role-questions" className={roleID != null ? '' : 'none'}>
                        {
                            CONTENT.feedback.groups[roleID || 0].questions.map((props, i) => getInput({ ...props, key: `[KEY]-` + getRoleUID(roleID || 0, i), UID: getRoleUID(roleID || 0, i), valueCallback: getResponse, callBack: handleResponse }))
                        }
                    </div>
                    <div id="submit-box">
                        <ReCAPTCHA
                            // className={recaptchaClass}
                            sitekey={process.env.REACT_APP_recaptchaKey || 'Key'}
                            size="invisible"
                            ref={reCaptchaRef}
                        />
                        <button id="submit" onClick={handleSubmit}>Send Feedback</button>
                    </div>


                </div>
            </div>
        </div>
    );
}
export default Feedback;


//Input Type Components
const getInput = ({ ...props }: { key: any, UID: string, type: string, prompt: string, options?: string[], valueCallback?: any, callBack?: any }) => {//TS-GOOD
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

const Prompt = ({ ...props }: { prompt: string, note?: string | null, }) => {
    return (
        <div className='label-box'>
            <label htmlFor={String(props.prompt)}>{props.prompt}</label>
            <h6 className={props.note && props.note == 'Required' || props.note?.toLowerCase().includes('invalid') ? 'required' : props.note ? '' : 'none'}>{props.note}</h6>
        </div>
    );
}

const Field = ({ ...props }: { UID: string, prompt: string, note?: string | null, type?: string | null, valueCallback: any, callBack: any }) => {

    return (
        <div key={props.UID} id={props.UID} className="input-box input-field">
            <Prompt prompt={props.prompt} note={props.note} />
            <input name={String(props.prompt)} type={props.type || "text"} value={props.valueCallback(props.UID)}
                onChange={(e) => props.callBack(props.UID, e.target.value)} />
        </div>
    );
}

const Paragraph = ({ ...props }: { UID: string, prompt: string, note?: string | null, valueCallback: any, callBack: any }) => {

    return (
        <div key={props.UID} id={props.UID} className="input-box input-paragraph">
            <Prompt prompt={props.prompt} note={props.note} />
            <textarea name={String(props.prompt)} value={props.valueCallback(props.UID)}
                onChange={(e) => props.callBack(props.UID, e.target.value)} ></textarea>
        </div>
    );
}

//Single Select
const Option = ({ ...props }: { UID: string, prompt: string, note?: string | null, options: string[], valueCallback: any, callBack?: any }) => {
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(() => setSelected(props.valueCallback(props.UID) || ''), [props.valueCallback(props.UID)]);

    const handleSelection = (option: string) => {
        setSelected(option);
        props.callBack(props.UID, option);
    }

    return (
        <div key={props.UID} id={props.UID} className="input-box input-option">
            <Prompt prompt={props.prompt} note={props.note} />
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
const Select = ({ ...props }: { UID: string, prompt: string, note?: string | null, options: string[], valueCallback: any, callBack?: any }) => {
    const [selectedList, setSelectedList] = useState<string[]>([]);

    useEffect(() => {
        if (props.valueCallback(props.UID).length)
            setSelectedList(JSON.parse(props.valueCallback(props.UID) || '') || []);
    }, [props.valueCallback(props.UID)]);

    const handleSelection = (option: string) => {
        const list = [...selectedList];
        if (list.includes(option))
            list.splice(list.indexOf(option), 2);
        else
            list.push(option);

        setSelectedList([...list]);
        props.callBack(props.UID, JSON.stringify(list));
    }

    return (
        <div key={props.UID} id={props.UID} className="input-box input-select">
            <Prompt prompt={props.prompt} note={'Select Multiple' + (props.note || '')} />
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

const Drop = ({ ...props }: { UID: string, prompt: string, note?: string | null, options: string[], valueCallback: any, callBack?: any }) => {

    return (
        <div key={props.UID} id={props.UID} className="input-box input-drop">
            <Prompt prompt={props.prompt} note={props.note} />
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
