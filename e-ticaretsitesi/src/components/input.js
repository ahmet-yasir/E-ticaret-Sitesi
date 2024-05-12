import { React, useState, useRef, useEffect} from 'react'
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

function ErrorInput({isShow, type ,message, label, value, setValue}) {
    const [show, setShow] = useState(false);
    const target = useRef(null);
    return (
        <>
            <label className='w-100 text-start'>{label}</label>
            <div>
            <Overlay target={target.current} show={isShow} placement="right">
            {(props) => (
                <Tooltip id="overlay-example" {...props}>
                {message}
                </Tooltip>
            )}
            </Overlay>
            <input ref={target} onFocus={()=>setShow(true)} value={value} onChange={(e)=>setValue(e.target.value)} className='form-control form-control-sm' type={type}/>
            </div>
        </>
    )
}

function Input({type, label, value, setValue}) {
    return (
        <>
            <label className='w-100 text-start'>{label}</label>
            <input value={value} onChange={(e)=>setValue(e.target.value)} className='form-control form-control-sm' type={type}/>
        </>
    )
}
export {ErrorInput, Input};