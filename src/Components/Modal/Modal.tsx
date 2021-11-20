import React from 'react'
import Style from './Modal.module.css';
import {AiOutlineClose} from 'react-icons/ai';

interface Props {
    children: JSX.Element,
    show: boolean;
    toggle: () => void;
    title?: String
}
const Modal = (props: Props) => {
    return (
        <div className={props.show ? [Style.Modal, Style.Show].join(" ") : Style.Modal}>
            <div className={Style.Children}>
                <h2>{props.title}</h2>
                <p>{props.children}</p>
                <span onClick={props.toggle}><AiOutlineClose/></span>
            </div>
        </div>
    )
}

export default Modal
